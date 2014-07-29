#!/bin/sh
echo "Clean project ..."
ti clean
echo "#######"
echo "Build and launch project ..."
ti build -p ios -F ipad -I 7.1 --sdk 3.3.0.GA --express --shadow
