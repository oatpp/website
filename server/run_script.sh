#!/bin/sh

(while true; do 
	echo "starting app..."
	./main/build/oatpp-website-exe
done) &> log.txt
