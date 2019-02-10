#!/bin/sh

(while true; do 
	echo "starting app..."
	./run_site
done) &> log.txt
