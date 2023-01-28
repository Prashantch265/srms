import { Migration } from '@mikro-orm/migrations';

export class Migration20230128160004 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "external_users" ("user_id" uuid not null, "created_at" timestamptz(0) null, "updated_at" timestamptz(0) null, "created_by" uuid null, "updated_by" uuid null, "is_active" boolean not null default true, "is_permanent" boolean not null default false, "user_name" varchar(255) not null, "first_name" varchar(255) not null, "last_name" varchar(255) not null, "profile_pic" varchar(255) null, "email" varchar(255) null, "contact_no" varchar(255) null, "provider" varchar(255) null, "password" varchar(255) null, "otp" varchar(255) null, "otp_expiration_time" timestamptz(0) null, "email_otp_verified" boolean not null default false, "sms_otp_verified" boolean not null default false, "otp_type" varchar(255) not null default \'web\', "token" varchar(255) null, "access_token" varchar(255) null, "refresh_token" varchar(255) null, constraint "external_users_pkey" primary key ("user_id"));',
    );

    this.addSql(
      'create table "otp_configurations" ("id" serial primary key, "created_at" timestamptz(0) null, "updated_at" timestamptz(0) null, "created_by" uuid null, "updated_by" uuid null, "is_active" boolean not null default true, "is_permanent" boolean not null default false, "otp_length" int not null, "expiration_time" varchar(255) not null, "alphabets" boolean not null default false, "uppercase" boolean not null default false, "special_char" boolean not null default false, "digits" boolean not null default false, "type" text check ("type" in (\'web\', \'mobile\')) not null default \'web\');',
    );

    this.addSql(
      'create table "privileges" ("id" serial primary key, "created_at" timestamptz(0) null, "updated_at" timestamptz(0) null, "created_by" uuid null, "updated_by" uuid null, "is_active" boolean not null default true, "is_permanent" boolean not null default false, "name" varchar(255) not null, "code" varchar(255) not null, "description" varchar(255) null);',
    );
    this.addSql(
      'alter table "privileges" add constraint "privileges_code_unique" unique ("code");',
    );

    this.addSql(
      'create table "roles" ("id" serial primary key, "created_at" timestamptz(0) null, "updated_at" timestamptz(0) null, "created_by" uuid null, "updated_by" uuid null, "is_active" boolean not null default true, "is_permanent" boolean not null default false, "name" varchar(255) not null, "code" varchar(255) not null, "description" varchar(255) null);',
    );
    this.addSql(
      'alter table "roles" add constraint "roles_code_unique" unique ("code");',
    );

    this.addSql(
      'create table "screens" ("id" serial primary key, "created_at" timestamptz(0) null, "updated_at" timestamptz(0) null, "created_by" uuid null, "updated_by" uuid null, "is_active" boolean not null default true, "is_permanent" boolean not null default false, "name" varchar(255) not null, "code" varchar(255) not null, "description" varchar(255) null);',
    );
    this.addSql(
      'alter table "screens" add constraint "screens_code_unique" unique ("code");',
    );

    this.addSql(
      'create table "modules" ("id" serial primary key, "created_at" timestamptz(0) null, "updated_at" timestamptz(0) null, "created_by" uuid null, "updated_by" uuid null, "is_active" boolean not null default true, "is_permanent" boolean not null default false, "name" varchar(255) not null, "code" varchar(255) not null, "description" varchar(255) null, "screen_id" int null);',
    );
    this.addSql(
      'alter table "modules" add constraint "modules_code_unique" unique ("code");',
    );

    this.addSql(
      'create table "module_privilege_mapping" ("id" serial primary key, "created_at" timestamptz(0) null, "updated_at" timestamptz(0) null, "created_by" uuid null, "updated_by" uuid null, "is_active" boolean not null default true, "is_permanent" boolean not null default false, "module_id" int not null, "privilege_id" int not null, "method" varchar(255) not null, "endpoint" varchar(255) not null);',
    );

    this.addSql(
      'create table "rsmp" ("id" serial primary key, "created_at" timestamptz(0) null, "updated_at" timestamptz(0) null, "created_by" uuid null, "updated_by" uuid null, "is_active" boolean not null default true, "is_permanent" boolean not null default false, "role_id" int not null, "mpm_id" int not null);',
    );

    this.addSql(
      'create table "users" ("user_id" uuid not null, "created_at" timestamptz(0) null, "updated_at" timestamptz(0) null, "created_by" uuid null, "updated_by" uuid null, "is_active" boolean not null default true, "is_permanent" boolean not null default false, "full_name" varchar(255) not null, "contact" varchar(255) not null, "profile_pic" varchar(255) null, "user_name" varchar(255) not null, "email" varchar(255) null, "password" varchar(255) null, constraint "users_pkey" primary key ("user_id"));',
    );

    this.addSql(
      'create table "user_role" ("id" serial primary key, "created_at" timestamptz(0) null, "updated_at" timestamptz(0) null, "created_by" uuid null, "updated_by" uuid null, "is_active" boolean not null default true, "is_permanent" boolean not null default false, "internal_user_id" uuid null, "external_user_id" uuid null, "role_id" int null);',
    );

    this.addSql(
      'alter table "modules" add constraint "modules_screen_id_foreign" foreign key ("screen_id") references "screens" ("id") on update cascade on delete cascade;',
    );

    this.addSql(
      'alter table "module_privilege_mapping" add constraint "module_privilege_mapping_module_id_foreign" foreign key ("module_id") references "modules" ("id") on update cascade on delete cascade;',
    );
    this.addSql(
      'alter table "module_privilege_mapping" add constraint "module_privilege_mapping_privilege_id_foreign" foreign key ("privilege_id") references "privileges" ("id") on update cascade on delete cascade;',
    );

    this.addSql(
      'alter table "rsmp" add constraint "rsmp_role_id_foreign" foreign key ("role_id") references "roles" ("id") on update cascade on delete cascade;',
    );
    this.addSql(
      'alter table "rsmp" add constraint "rsmp_mpm_id_foreign" foreign key ("mpm_id") references "module_privilege_mapping" ("id") on update cascade on delete cascade;',
    );

    this.addSql(
      'alter table "user_role" add constraint "user_role_internal_user_id_foreign" foreign key ("internal_user_id") references "users" ("user_id") on update cascade on delete cascade;',
    );
    this.addSql(
      'alter table "user_role" add constraint "user_role_external_user_id_foreign" foreign key ("external_user_id") references "external_users" ("user_id") on update cascade on delete cascade;',
    );
    this.addSql(
      'alter table "user_role" add constraint "user_role_role_id_foreign" foreign key ("role_id") references "roles" ("id") on update cascade on delete cascade;',
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "user_role" drop constraint "user_role_external_user_id_foreign";',
    );

    this.addSql(
      'alter table "module_privilege_mapping" drop constraint "module_privilege_mapping_privilege_id_foreign";',
    );

    this.addSql('alter table "rsmp" drop constraint "rsmp_role_id_foreign";');

    this.addSql(
      'alter table "user_role" drop constraint "user_role_role_id_foreign";',
    );

    this.addSql(
      'alter table "modules" drop constraint "modules_screen_id_foreign";',
    );

    this.addSql(
      'alter table "module_privilege_mapping" drop constraint "module_privilege_mapping_module_id_foreign";',
    );

    this.addSql('alter table "rsmp" drop constraint "rsmp_mpm_id_foreign";');

    this.addSql(
      'alter table "user_role" drop constraint "user_role_internal_user_id_foreign";',
    );

    this.addSql('drop table if exists "external_users" cascade;');

    this.addSql('drop table if exists "otp_configurations" cascade;');

    this.addSql('drop table if exists "privileges" cascade;');

    this.addSql('drop table if exists "roles" cascade;');

    this.addSql('drop table if exists "screens" cascade;');

    this.addSql('drop table if exists "modules" cascade;');

    this.addSql('drop table if exists "module_privilege_mapping" cascade;');

    this.addSql('drop table if exists "rsmp" cascade;');

    this.addSql('drop table if exists "users" cascade;');

    this.addSql('drop table if exists "user_role" cascade;');
  }
}
