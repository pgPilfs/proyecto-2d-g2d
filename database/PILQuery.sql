CREATE DATABASE PilMoney
GO
USE PilMoney
GO
CREATE TABLE TipoCuenta
(
	Id INT PRIMARY KEY IDENTITY,
	Tipo VARCHAR(20) NOT NULL
)
GO

CREATE TABLE Cuenta
(
	Id INT PRIMARY KEY IDENTITY,
	Saldo FLOAT NOT NULL,
	CVU VARCHAR(50) NOT NULL,
	Fecha_Alta DATETIME NOT NULL,
	Estado VARCHAR(10) NOT NULL,
	Id_TipoCuenta INT,
	FOREIGN KEY (Id_TipoCuenta) REFERENCES TipoCuenta(Id) 
)
GO

CREATE TABLE Usuario
(
	Id INT PRIMARY KEY IDENTITY,
	NombreCompleto VARCHAR(50) NOT NULL,
	DNI VARCHAR(8) NOT NULL,
	Sexo VARCHAR(1) NOT NULL,
	Fecha_Nac DATETIME NOT NULL,
	Email VARCHAR(50) NOT NULL,
	Contraseņa VARCHAR(16) NOT NULL,
	Id_Cuenta INT,
	FOREIGN KEY (Id_Cuenta) REFERENCES Cuenta(Id) 
)
GO

CREATE TABLE Transferencia
(
	Id INT PRIMARY KEY IDENTITY,
	Id_CuentaEnvia INT,
	Id_CuentaRecibe INT,
	Fecha_Hora DATETIME NOT NULL,
	Monto FLOAT NOT NULL,
	FOREIGN KEY (Id_CuentaEnvia) REFERENCES Cuenta(Id),
	FOREIGN KEY (Id_CuentaRecibe) REFERENCES Cuenta(Id) 
)
GO

CREATE TABLE Movimiento
(
	Id INT PRIMARY KEY IDENTITY,
	Id_Cuenta INT,
	Fecha_Hora DATETIME NOT NULL,
	Monto FLOAT NOT NULL,
	Tipo_Movimiento VARCHAR(50) NOT NULL,	
	FOREIGN KEY (Id_Cuenta) REFERENCES Cuenta(Id) 
)
GO

