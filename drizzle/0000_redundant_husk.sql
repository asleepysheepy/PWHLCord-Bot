CREATE TABLE "guild" (
	"id" varchar(30) PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	"prefix" text DEFAULT ';' NOT NULL
);
