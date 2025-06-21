#include "sam3n4c.h"
#include "pio.h"
#include "board.h"

#define MAINCK			(16000000)		// 16 MHz

#define D0    {PIO_PA0, (AT91S_PIO *) PIOA, AT91C_ID_PIOA, PIO_OUTPUT_1, PIO_DEFAULT}
#define D1    {PIO_PA1, (AT91S_PIO *) PIOA, AT91C_ID_PIOA, PIO_OUTPUT_1, PIO_DEFAULT}
#define D2    {PIO_PA2, (AT91S_PIO *) PIOA, AT91C_ID_PIOA, PIO_OUTPUT_1, PIO_DEFAULT}
#define D3    {PIO_PA3, (AT91S_PIO *) PIOA, AT91C_ID_PIOA, PIO_OUTPUT_1, PIO_DEFAULT}
#define D4    {PIO_PA4, (AT91S_PIO *) PIOA, AT91C_ID_PIOA, PIO_OUTPUT_1, PIO_DEFAULT}
#define D5    {PIO_PA5, (AT91S_PIO *) PIOA, AT91C_ID_PIOA, PIO_OUTPUT_1, PIO_DEFAULT}
#define D6    {PIO_PA6, (AT91S_PIO *) PIOA, AT91C_ID_PIOA, PIO_OUTPUT_1, PIO_DEFAULT}
#define D7    {PIO_PA7, (AT91S_PIO *) PIOA, AT91C_ID_PIOA, PIO_OUTPUT_1, PIO_DEFAULT}

#define CS0   {PIO_PA8, (AT91S_PIO *) PIOA, AT91C_ID_PIOA, PIO_OUTPUT_0, PIO_DEFAULT}
#define CS1   {PIO_PA9, (AT91S_PIO *) PIOA, AT91C_ID_PIOA, PIO_OUTPUT_0, PIO_DEFAULT}

volatile int32_t ITM_RxBuffer;                    /*!< external variable to receive characters                    */

/// Pins to configure for the application.
const Pin LedControlPins[] = {
	D0, D1, D2, D3,
	D4, D5, D6, D7,
	CS0, CS1,
};
#define CS0_IND		8
#define CS1_IND		9


#define STR_QUANTITY	8

#define DIGIT_PERIOD	0x100

#define column_0	0x01
#define column_1	0x02
#define column_2	0x04
#define column_3	0x08
#define column_4	0x10
#define column_5	0x20
#define column_6	0x40
#define column_7	0x80
#define columnsOFF	0x00

static uint8_t aunFont[][STR_QUANTITY] = {
	{
		// 76543210
		// _1_11_1_
		// _1_11_1_
		// _1_11_1_
		// _1_11_1_
		// _1_11_1_
		// _1111111
		// _______1
		// _______1
		column_6 | column_4 | column_3 | column_1,
		column_6 | column_4 | column_3 | column_1,
		column_6 | column_4 | column_3 | column_1,
		column_6 | column_4 | column_3 | column_1,
		column_6 | column_4 | column_3 | column_1,
		column_6 | column_5 | column_4 | column_3 | column_2 | column_1 | column_0,
		column_0,
		column_0,
	},
	{
		// 76543210
		// _111111_
		// _1______
		// _1______
		// _111111_
		// _111111_
		// _1______
		// _1______
		// _111111_
		column_6 | column_5 | column_4 | column_3 | column_2 | column_1,
		column_6,
		column_6,
		column_6 | column_5 | column_4 | column_3 | column_2 | column_1,
		column_6 | column_5 | column_4 | column_3 | column_2 | column_1,
		column_6,
		column_6,
		column_6 | column_5 | column_4 | column_3 | column_2 | column_1,
	},
	{
		// 76543210
		// 11111111
		// 11____11
		// 11____11
		// 11111111
		// 11______
		// 11______
		// 11______
		// 11______
		column_7 | column_6 | column_5 | column_4 | column_3 | column_2 | column_1 | column_0,
		column_7 | column_6 | column_1 | column_0,
		column_7 | column_6 | column_1 | column_0,
		column_7 | column_6 | column_5 | column_4 | column_3 | column_2 | column_1 | column_0,
		column_7 | column_6,
		column_7 | column_6,
		column_7 | column_6,
		column_7 | column_6,
	},
	{
		// 76543210
		// 11111111
		// 11______
		// 11______
		// 11______
		// 11111111
		// 11____11
		// 11____11
		// 11111111
		column_7 | column_6 | column_5 | column_4 | column_3 | column_2 | column_1 | column_0,
		column_7 | column_6,
		column_7 | column_6,
		column_7 | column_6,
		column_7 | column_6 | column_5 | column_4 | column_3 | column_2 | column_1 | column_0,
		column_7 | column_6 | column_1 | column_0,
		column_7 | column_6 | column_1 | column_0,
		column_7 | column_6 | column_5 | column_4 | column_3 | column_2 | column_1 | column_0,
	},
	{
		// 76543210
		// ___11___
		// __1111__
		// __1111__
		// _11__11_
		// _11__11_
		// 11111111
		// 11____11
		// 11____11
		column_4 | column_3,
		column_5 | column_4 | column_3 | column_2,
		column_5 | column_4 | column_3 | column_2,
		column_6 | column_5 | column_2 | column_1,
		column_6 | column_5 | column_2 | column_1,
		column_7 | column_6 | column_5 | column_4 | column_3 | column_2 | column_1 | column_0,
		column_7 | column_6 | column_1 | column_0,
		column_7 | column_6 | column_1 | column_0,
	},
	{
		// 76543210
		// 11____11
		// 11___11_
		// 11__11__
		// 11111___
		// 11111___
		// 11__11__
		// 11___11_
		// 11____11
		column_7 | column_6 | column_1 | column_0,
		column_7 | column_6 | column_2 | column_1,
		column_7 | column_6 | column_3 | column_2,
		column_7 | column_6 | column_5 | column_4 | column_3,
		column_7 | column_6 | column_5 | column_4 | column_3,
		column_7 | column_6 | column_3 | column_2,
		column_7 | column_6 | column_2 | column_1,
		column_7 | column_6 | column_1 | column_0,
	},
	{
		// 76543210
		// 11111111
		// 11111111
		// 11____11
		// 11____11
		// 11____11
		// 11____11
		// 11111111
		// 11111111
		column_7 | column_6 | column_5 | column_4 | column_3 | column_2 | column_1 | column_0,
		column_7 | column_6 | column_5 | column_4 | column_3 | column_2 | column_1 | column_0,
		column_7 | column_6 | column_1 | column_0,
		column_7 | column_6 | column_1 | column_0,
		column_7 | column_6 | column_1 | column_0,
		column_7 | column_6 | column_1 | column_0,
		column_7 | column_6 | column_5 | column_4 | column_3 | column_2 | column_1 | column_0,
		column_7 | column_6 | column_5 | column_4 | column_3 | column_2 | column_1 | column_0,
	},
	{
		// 76543210
		// 11111111
		// 11____11
		// 11____11
		// 11111111
		// 11111111
		// 11____11
		// 11____11
		// 11111111
		column_7 | column_6 | column_5 | column_4 | column_3 | column_2 | column_1 | column_0,
		column_7 | column_6 | column_1 | column_0,
		column_7 | column_6 | column_1 | column_0,
		column_7 | column_6 | column_5 | column_4 | column_3 | column_2 | column_1 | column_0,
		column_7 | column_6 | column_5 | column_4 | column_3 | column_2 | column_1 | column_0,
		column_7 | column_6 | column_1 | column_0,
		column_7 | column_6 | column_1 | column_0,
		column_7 | column_6 | column_5 | column_4 | column_3 | column_2 | column_1 | column_0,
	},


	{
		// 76543210
		// 1__11__1
		// _1_11_1_
		// __1111__
		// ___11___
		// ___11___
		// __1111__
		// _1_11_1_
		// 1__11__1
		
		column_7 | column_4 | column_3 | column_0,
		column_6 | column_4 | column_3 | column_1,
		column_5 | column_4 | column_3 | column_2,
		column_4 | column_3,
		column_4 | column_3,
		column_5 | column_4 | column_3 | column_2,
		column_6 | column_4 | column_3 | column_1,
		column_7 | column_4 | column_3 | column_0,
	},
	{
		// 76543210
		// _111111_
		// _1______
		// _1______
		// _111111_
		// _111111_
		// _1______
		// _1______
		// _111111_
		column_6 | column_5 | column_4 | column_3 | column_2 | column_1,
		column_6,
		column_6,
		column_6 | column_5 | column_4 | column_3 | column_2 | column_1,
		column_6 | column_5 | column_4 | column_3 | column_2 | column_1,
		column_6,
		column_6,
		column_6 | column_5 | column_4 | column_3 | column_2 | column_1,
	},
	{
		// 76543210
		// 11____11
		// 11____11
		// 11____11
		// 11111111
		// 11111111
		// 11____11
		// 11____11
		// 11____11
		column_7 | column_6 | column_1 | column_0,
		column_7 | column_6 | column_1 | column_0,
		column_7 | column_6 | column_1 | column_0,
		column_7 | column_6 | column_5 | column_4 | column_3 | column_2 | column_1 | column_0,
		column_7 | column_6 | column_5 | column_4 | column_3 | column_2 | column_1 | column_0,
		column_7 | column_6 | column_1 | column_0,
		column_7 | column_6 | column_1 | column_0,
		column_7 | column_6 | column_1 | column_0,
	},
	{
		// 76543210
		// 11111111
		// 11____11
		// 11____11
		// 11111111
		// ___11111
		// __11__11
		// _11___11
		// 11____11
		column_7 | column_6 | column_5 | column_4 | column_3 | column_2 | column_1 | column_0,
		column_7 | column_6 | column_1 | column_0,
		column_7 | column_6 | column_1 | column_0,
		column_7 | column_6 | column_5 | column_4 | column_3 | column_2 | column_1 | column_0,
		column_4 | column_3 | column_2 | column_1 | column_0,
		column_5 | column_4 | column_1 | column_0,
		column_6 | column_5 | column_1 | column_0,
		column_7 | column_6 | column_1 | column_0,
	},
};

void Delay ( unsigned long nTime );

int main ( void ) {
	int			iIndex;
	uint8_t		unDispString = 0;
	uint8_t		unFontIndex = 0;
	uint8_t		unDigit = 0;
	int			nDelayIn, nDelayOut;

	SysTick_Config ( MAINCK / 10000 );

	for (iIndex = 0; iIndex < sizeof(LedControlPins) / sizeof(Pin); iIndex++) {
		PIO_Configure ( LedControlPins + iIndex, PIO_LISTSIZE ( LedControlPins[iIndex] ) );
	}

	for(;;) {
		nDelayOut = DIGIT_PERIOD;
		while (--nDelayOut > 0) {
			for (iIndex = 0; iIndex < STR_QUANTITY; iIndex++) {
				if (iIndex == unDispString) {
					PIO_Clear ( LedControlPins + iIndex );
				} else {
					PIO_Set ( LedControlPins + iIndex );
				}
			}
			PIO_Set ( LedControlPins + CS0_IND );
			PIO_Clear ( LedControlPins + CS0_IND );

			for (iIndex = 0; iIndex < STR_QUANTITY; iIndex++) {
				if (aunFont[unDigit][unFontIndex] & (1 << iIndex)) {
					PIO_Set ( LedControlPins + iIndex );
				} else {
					PIO_Clear ( LedControlPins + iIndex );
				}
			}
			PIO_Set ( LedControlPins + CS1_IND );
			PIO_Clear ( LedControlPins + CS1_IND );
			unFontIndex = (unFontIndex + 1) & (STR_QUANTITY - 1);

			// Delay
			for (nDelayIn = 0; nDelayIn < 100; nDelayIn++) {
			}

			for (iIndex = 0; iIndex < STR_QUANTITY; iIndex++) {
				PIO_Clear ( LedControlPins + iIndex );
			}
			PIO_Set ( LedControlPins + CS1_IND );
			PIO_Clear ( LedControlPins + CS1_IND );
			if (++unDispString >= STR_QUANTITY) {
				unDispString = 0;
			}
		}
		unDigit++;
		unDigit %= (sizeof(aunFont) / STR_QUANTITY / sizeof(uint8_t));
	}
	return 0;
}
