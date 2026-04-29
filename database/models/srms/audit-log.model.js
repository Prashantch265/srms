module.exports = (sequelize, DataTypes) => {
  const AuditLog = sequelize.define(
    "audit_logs",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      entityName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "entity_name",
      },
      recordId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "record_id",
      },
      action: {
        type: DataTypes.ENUM("INSERT", "UPDATE", "DELETE"),
        allowNull: false,
      },
      oldValues: {
        // Utilizing PostgreSQL JSONB for flexible NoSQL-like payload storage
        type: DataTypes.JSONB,
        allowNull: true,
        field: "old_values",
      },
      newValues: {
        type: DataTypes.JSONB,
        allowNull: true,
        field: "new_values",
      },
      performedBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "performed_by",
      },
    },
    {
      tableName: "audit_logs",
      updatedAt: false, // ABSTRACT ALIGNMENT: Immutable logs only have a createdAt timestamp
    }
  );

  return AuditLog;
};
