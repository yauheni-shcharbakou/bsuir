; Занести $АА и $55 в регистры А и В соответственно. Перенести значение этих регистров 
; в регистр X таким образом, чтобы в регистре X оказалось значение $55АА

; pryalkin's solution incorrect. Highly recommended use it unstead

  org $8000

 	ldaa #$AA
	ldab #$55
 	psha
	pshb
	pulx
hlt