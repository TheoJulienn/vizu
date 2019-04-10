#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Mon Apr  8 12:43:50 2019

@author: theo
"""

import json
from datetime import date,timedelta
from random import randint


PAS = 15000
NOMBRE = int(1000/(PAS/1000))

data = {} 

data['liste']=[]
for i in range(NOMBRE):
    
    for j in range(NOMBRE):
        point = {}
        point['date'] =   {  
            'date_debut': str(date.today()-timedelta(days=7)),
            'date_fin': str(date.today())
        }
        point['coordinates']={  
            'x0': 87935 + i*PAS,
            'y0': 7131174 - j*PAS,
        }
        point['utilization'] = randint(0,2000)
        

        data['liste'].append(point)

with open('data.json', 'w') as outfile:  
    json.dump(data, outfile)
