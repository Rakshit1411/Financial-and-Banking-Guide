# -*- coding: utf-8 -*-
"""random_forest_model.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1bjJUbPd3yWOHlQgB4WgjILaEerJ6VDmh
"""

import numpy as nm
import matplotlib.pyplot as mpt
import pandas as pd

data= pd.read_csv('/content/modeldata.csv')

data

x= data.iloc[:,:13].values

print (x)

y= data.iloc[:,13:].values

print(y)

from sklearn.model_selection import train_test_split  
x_train, x_test, y_train, y_test= train_test_split(x, y, test_size= 0.2, random_state=0)

import sklearn
print(sklearn.__version__)

#from sklearn.linear_model import LinearRegression
#regressor=LinearRegression()
from sklearn.tree import DecisionTreeRegressor
#regressor = DecisionTreeRegressor()
#regressor.fit(x_train,y_train)

from sklearn.ensemble import RandomForestRegressor 
  
 # create regressor object 
regressor = RandomForestRegressor(n_estimators = 100, random_state = 0) 
  
# fit the regressor with x and y data 
regressor.fit(x_train, y_train)

y_pred=regressor.predict(x_test)

print(y_pred)

print(y_test)

from sklearn.metrics import accuracy_score
acc = accuracy_score(y_true=y_test[:,0], y_pred=y_pred[:,0])



x_test[:,0]

y_test.shape

from sklearn.metrics import mean_squared_error
 mean_squared_error(y_test[:,1], y_pred[:,1])

import matplotlib.pyplot as plt
plt.scatter(y_test[:,0], y_pred[:,0], color = 'blue')   
  
# plot predicted data 
#plt.plot(X_grid, regressor.predict(X_grid),  
        # color = 'green')  
plt.title('Random Forest Regression') 
plt.xlabel('Position level') 
plt.ylabel('Salary') 
plt.show()

import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.model_selection import cross_val_score
from sklearn.model_selection import KFold
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import MinMaxScaler
from tensorflow.python.keras.models import Sequential
from tensorflow.python.keras.layers import Dense
from tensorflow.python.keras.wrappers.scikit_learn import KerasRegressor

model = Sequential()
model.add(Dense(12, input_dim=13, kernel_initializer='normal', activation='relu'))
model.add(Dense(32, activation='relu'))
model.add(Dense(12, activation='relu'))
model.summary()

model.compile(loss='mse', optimizer='adam', metrics=['mse','mae'])

history = model.fit(x_train, y_train, epochs=200, batch_size=128,  verbose=1, validation_split=0.2)

ynew= model.predict(x_test[0].reshape(1,13))

x_test[0].reshape(1,13)

ynew

y_test[0]

