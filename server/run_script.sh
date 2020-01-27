#!/bin/sh

(while true; do 
	echo "starting app... `date '+%d.%m.%Y - %H:%M:%S'`" >> log.txt
	./main/build/oatpp-website-exe
done)
