#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Mon Apr  8 12:43:50 2019

@author: theo
"""

import json
from datetime import date,timedelta
from random import randint
import numpy as np


PAS = 15000
NOMBRE = int(1000/(PAS/1000))
mu, sigma = 1000, 500 # mean and standard deviation
s = np.random.normal(mu, sigma, 1)
print(s)
data = {} 

data['liste']=[]
for i in range(NOMBRE):
    
    for j in range(NOMBRE):
        point = {}
        point['id'] = str(87935 + i*PAS) + str(7131174 - j*PAS)
        point['date'] =   {  
            'date_debut': str(date.today()-timedelta(days=7)),
            'date_fin': str(date.today())
        }
        point['coordinates']={  
            'x0': 87935 + i*PAS,
            'y0': 7131174 - j*PAS,
        }
        point['utilization'] = int(np.random.normal(mu, sigma, 1)[0])
        

        data['liste'].append(point)

with open('data.json', 'w') as outfile:  
    json.dump(data, outfile)
