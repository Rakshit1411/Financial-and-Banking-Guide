# -*- coding: utf-8 -*-
"""datapreprocess1.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1529wRjrGZTdF0kJaCTnENBzyWxAEurmt
"""

import numpy as nm
import matplotlib.pyplot as mpt
import pandas as pd

data= pd.read_csv('/content/expenses.csv')

data.head(500)

#from sklearn.preprocessing import LabelEncoder
#le = LabelEncoder()

#data['Geography'] = le.fit_transform(data['Geography'].astype(str))
#data['Gender'] = le.fit_transform(data['Gender'].astype(str))
#data['marital'] = le.fit_transform(data['marital'].astype(str))
data=pd.get_dummies(data, columns=["Geography", "Gender","marital"], prefix=["geography", "gender","marital"])

data.head(500)

res = data.iloc[:, nm.r_[2, 6:10]]

print(res)

data.to_csv('out.csv')

print(data)

data.head(500)

