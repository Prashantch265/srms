/*
 * @Author: prashant.chaudhary
 * @Date: 2023-01-29 18:42:17
 * @Last Modified by: prashant.chaudhary
 * @Last Modified time: 2023-01-29 18:42:54
 */

import { EntityRepository } from '@mikro-orm/postgresql';
import ApprovalJourney from './approval-journey.entity';

export class ApprovalJourneyRepository extends EntityRepository<ApprovalJourney> {}
