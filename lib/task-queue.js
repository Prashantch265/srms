const { logger } = require("../utils/logger");

/**
 * ABSTRACT ALIGNMENT: Concurrency Management & Thread-Starvation Prevention
 * Custom implementation of a Bounded Task Queue using the Producer-Consumer pattern.
 * This guarantees that CPU-intensive tasks (like PDF generation) and network I/O
 * (like SMTP email dispatch) do not block the single-threaded Node.js Event Loop.
 */
class TaskQueue {
  constructor(concurrencyLimit = 5) {
    this.concurrencyLimit = concurrencyLimit; // Maximum number of concurrent workers
    this.running = 0;
    this.queue = [];
  }

  // Producer: Adds a new job to the back of the queue
  enqueue(task) {
    this.queue.push(task);
    this.processNext();
  }

  // Consumer: Picks up the next job if worker slots are available
  async processNext() {
    // If we've reached max concurrency or the queue is empty, do nothing
    if (this.running >= this.concurrencyLimit || this.queue.length === 0) {
      return;
    }

    this.running++;
    const task = this.queue.shift();

    try {
      // Await the execution of the background task
      await task();
    } catch (error) {
      logger.error("Background task failed in TaskQueue:", error);
    } finally {
      this.running--;
      // As soon as a worker is freed, immediately process the next item
      this.processNext();
    }
  }

  getQueueLength() {
    return this.queue.length;
  }
}

// Export as a singleton instance so the entire application shares the same queue limits
const reportTaskQueue = new TaskQueue(5);

module.exports = reportTaskQueue;
