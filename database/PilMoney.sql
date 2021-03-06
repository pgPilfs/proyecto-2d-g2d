USE [master]
GO
/****** Object:  Database [PilMoney]    Script Date: 20/9/2021 10:36:01 ******/
CREATE DATABASE [PilMoney]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'PilMoney', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\PilMoney.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'PilMoney_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\PilMoney_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [PilMoney] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [PilMoney].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [PilMoney] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [PilMoney] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [PilMoney] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [PilMoney] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [PilMoney] SET ARITHABORT OFF 
GO
ALTER DATABASE [PilMoney] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [PilMoney] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [PilMoney] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [PilMoney] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [PilMoney] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [PilMoney] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [PilMoney] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [PilMoney] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [PilMoney] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [PilMoney] SET  DISABLE_BROKER 
GO
ALTER DATABASE [PilMoney] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [PilMoney] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [PilMoney] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [PilMoney] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [PilMoney] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [PilMoney] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [PilMoney] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [PilMoney] SET RECOVERY FULL 
GO
ALTER DATABASE [PilMoney] SET  MULTI_USER 
GO
ALTER DATABASE [PilMoney] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [PilMoney] SET DB_CHAINING OFF 
GO
ALTER DATABASE [PilMoney] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [PilMoney] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [PilMoney] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [PilMoney] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'PilMoney', N'ON'
GO
ALTER DATABASE [PilMoney] SET QUERY_STORE = OFF
GO
USE [PilMoney]
GO
/****** Object:  Table [dbo].[cuentas]    Script Date: 20/9/2021 10:36:01 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[cuentas](
	[id] [int] NOT NULL,
	[saldo] [float] NOT NULL,
	[cvu] [varchar](50) NOT NULL,
	[fecha_alta] [datetime] NOT NULL,
	[estado] [varchar](50) NOT NULL,
	[id_tipo_cuenta] [int] NULL,
 CONSTRAINT [PK_cuentas] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[movimientos]    Script Date: 20/9/2021 10:36:01 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[movimientos](
	[id] [int] NOT NULL,
	[fecha_hora] [datetime] NOT NULL,
	[monto] [float] NOT NULL,
	[tipo_movimiento] [varchar](50) NOT NULL,
	[id_cuenta] [int] NULL,
 CONSTRAINT [PK_movimientos] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tipo_cuenta]    Script Date: 20/9/2021 10:36:01 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tipo_cuenta](
	[id] [int] NOT NULL,
	[tipo] [varchar](50) NOT NULL,
 CONSTRAINT [PK_tipo_cuenta] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[transferencias]    Script Date: 20/9/2021 10:36:01 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[transferencias](
	[id] [int] NOT NULL,
	[fecha_hora] [datetime] NOT NULL,
	[monto] [float] NOT NULL,
	[id_cuenta_envia] [int] NULL,
	[id_cuenta_recibe] [int] NULL,
 CONSTRAINT [PK_transferencias] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[usuarios]    Script Date: 20/9/2021 10:36:01 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[usuarios](
	[id] [int] NOT NULL,
	[nombre_completo] [varchar](50) NOT NULL,
	[dni] [varchar](50) NOT NULL,
	[sexo] [varchar](1) NOT NULL,
	[fecha_nac] [date] NOT NULL,
	[email] [varchar](50) NOT NULL,
	[password] [varchar](50) NOT NULL,
	[id_cuenta] [int] NULL,
 CONSTRAINT [PK_usuarios] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[cuentas]  WITH CHECK ADD  CONSTRAINT [FK_cuentas_tipo_cuenta] FOREIGN KEY([id_tipo_cuenta])
REFERENCES [dbo].[tipo_cuenta] ([id])
GO
ALTER TABLE [dbo].[cuentas] CHECK CONSTRAINT [FK_cuentas_tipo_cuenta]
GO
ALTER TABLE [dbo].[movimientos]  WITH CHECK ADD  CONSTRAINT [FK_movimientos_cuentas] FOREIGN KEY([id_cuenta])
REFERENCES [dbo].[cuentas] ([id])
GO
ALTER TABLE [dbo].[movimientos] CHECK CONSTRAINT [FK_movimientos_cuentas]
GO
ALTER TABLE [dbo].[transferencias]  WITH CHECK ADD  CONSTRAINT [FK_transferencias_cuenta_envia] FOREIGN KEY([id_cuenta_envia])
REFERENCES [dbo].[cuentas] ([id])
GO
ALTER TABLE [dbo].[transferencias] CHECK CONSTRAINT [FK_transferencias_cuenta_envia]
GO
ALTER TABLE [dbo].[transferencias]  WITH CHECK ADD  CONSTRAINT [FK_transferencias_cuenta_recibe] FOREIGN KEY([id_cuenta_recibe])
REFERENCES [dbo].[cuentas] ([id])
GO
ALTER TABLE [dbo].[transferencias] CHECK CONSTRAINT [FK_transferencias_cuenta_recibe]
GO
ALTER TABLE [dbo].[usuarios]  WITH CHECK ADD  CONSTRAINT [FK_usuarios_cuentas] FOREIGN KEY([id_cuenta])
REFERENCES [dbo].[cuentas] ([id])
GO
ALTER TABLE [dbo].[usuarios] CHECK CONSTRAINT [FK_usuarios_cuentas]
GO
USE [master]
GO
ALTER DATABASE [PilMoney] SET  READ_WRITE 
GO
