CREATE TABLE "birthday" (
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	"guildId" varchar(30),
	"userId" varchar(30),
	"birthMonth" text,
	"birthDay" integer,
	CONSTRAINT "birthday_guildId_userId_pk" PRIMARY KEY("guildId","userId")
);
--> statement-breakpoint
ALTER TABLE "guild" ADD COLUMN "birthdaysEnabled" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "guild" ADD COLUMN "birthdaysChannel" varchar(30);--> statement-breakpoint
ALTER TABLE "guild" ADD COLUMN "birthdaysTime" text;