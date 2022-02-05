---
title: 'MLX90614 using PIC18F4550'
description: 'How we use I2C to interface with MLX90614 sensor'
header_type: banner
invert: true
background: blank
layout: default
date: 2022-02-05 19:20:05
---

Explainations can be found @ https://docs.google.com/document/d/1_5mqVttXZUhZ_yZtjVG7S7VXeE-i3eONWqi9xh0mLtc/edit [Credits to (Shill, 2017)]

I have only added one line as per what the datasheets says, because we need to clear the interrupt caused by the I2C.

```c
	while(!SSPIF); // Wait Until Completion
    SSPIF = 0; // Clear The Interrupt Flag Bit
```

Complete code for PIC18F4550
```c
#include <xc.h>

#define _XTAL_FREQ 8000000

void I2C_Master_Init(const unsigned long c), I2C_Master_Wait(), I2C_Master_Start(), I2C_Master_RepeatedStart(), I2C_Master_Stop();
signed char I2C_Master_Write(unsigned d);
unsigned char I2C_Master_Read(unsigned short a);

void main()
{
    // Define SMBus Addresses
    char slave_address = 0x5A;                     // Define SMBus Addr for 1st sensor
    char slave_address_read = slave_address*2 + 1; // read command
    char slave_address_write = slave_address*2;

    // start I2C
    I2C_Master_Init(100000);      		           //Initialize I2C Master with 100KHz clock

    I2C_Master_Start();                            //Start condition
    I2C_Master_Write(slave_address_write);         // send write to slave address
    I2C_Master_Write(0x07);                        // send RAM address for Ta
    I2C_Master_RepeatedStart();                    // send repeat start
    I2C_Master_Write(slave_address_read);          // send read to slave address

    // read 3 bytes
    unsigned char low_byte = I2C_Master_Read(0);   // Read + Acknowledge
    unsigned char high_byte = I2C_Master_Read(0);  // Read + Acknowledge
    unsigned char pec_byte = I2C_Master_Read(1);   // Read + NotAcknowledge
    I2C_Master_Stop();		

    // Convert bytes to temperature data
    // Calculate object 1 temperature, sensor 1   
    unsigned int tempData = high_byte*256;         // Add high byte temp data
    tempData = tempData + low_byte;                // Add low byte temp data
    float temp = tempData*0.02;                    // Convert temp to Kelvin
    float Ctemp = temp - 273.15;                   // Convert temp to celsius

    while (1);
}				


void I2C_Master_Init(const unsigned long c)
{
  OSCCON = 0b01111010;
  SSPCON1 = 0x28;
  SSPCON2 = 0x00;
  SSPADD = (_XTAL_FREQ/(4*c))-1;    // Set I2C/SMBus clock speed
  SSPSTAT = 0xc0;
  SSPSTATbits.CKE = 1;            	// Use SMBus input signal levels (bit already set in previous step)
  TRISBbits.TRISB0 = 1;
  TRISBbits.TRISB1 = 1;
}

void I2C_Master_Wait()
{
  while ((SSPSTAT & 0x04) || (SSPCON2 & 0x1F));
}

void I2C_Master_Start()
{
  I2C_Master_Wait();
  SEN = 1;
}

void I2C_Master_RepeatedStart()
{
  I2C_Master_Wait();
  RSEN = 1;
}

void I2C_Master_Stop()
{
  I2C_Master_Wait();
  PEN = 1;
}

signed char I2C_Master_Write(unsigned d)
{
  I2C_Master_Wait();
  SSPBUF = d;

  //optional
  while(SSPSTATbits.R_W);   // wait until write cycle completed
  if(SSPCON2bits.ACKSTAT) return -2; // if we receive NAK

  return 0;
}

unsigned char I2C_Master_Read(unsigned short a)
{
	unsigned short temp;  
	I2C_Master_Wait();
	RCEN = 1;
	I2C_Master_Wait();

    // Added for PIC18F4550 -Yune
	while(!SSPIF); // Wait Until Completion
    SSPIF = 0; // Clear The Interrupt Flag Bit
    
	temp = SSPBUF;        // Read data from SSPBUF
	I2C_Master_Wait();
	ACKDT = (a)?0:1;
	ACKEN = 1;

	return temp;
}
```

# References
Shill, S., 2017. MLX90614 using PIC18_v2. [online] Available at: <https://docs.google.com/document/d/1_5mqVttXZUhZ_yZtjVG7S7VXeE-i3eONWqi9xh0mLtc/edit> [Accessed 18 January 2022].