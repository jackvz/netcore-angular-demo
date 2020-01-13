IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;

GO

CREATE TABLE [Incident] (
    [IncidentId] int NOT NULL IDENTITY,
    [Type] nvarchar(max) NOT NULL,
    [Description] nvarchar(max) NOT NULL,
    [Person] nvarchar(max) NOT NULL,
    [Dt] datetime2 NOT NULL,
    CONSTRAINT [PK_Incident] PRIMARY KEY ([IncidentId])
);

GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20200111191211_migration1', N'3.1.0');

GO

