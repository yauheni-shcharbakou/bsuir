; заполнить 10 ячеек стека значением ячеек памяти, начиная с $8000

	org $8100

	ldx #$8000

loop inx
	ldy 0,x
	pshy	

	cpx #$8010
	bne loop

hlt