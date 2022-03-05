from sklearn.metrics import classification_report, confusion_matrix
from sklearn import preprocessing
import pandas as pd
import numpy as np
from sklearn.metrics import accuracy_score
import pickle





url = r"/home/gilad/PycharmProjects/IoT/csv/big.csv"

# # Assign colum names to the dataset
#
# # Read dataset to pandas dataframe
irisdata = pd.read_csv(url, header=None, dtype=np.dtype("Float64") )

X = irisdata

buckets = [0] * len(X)

y = pd.Series(buckets)
# print(len(X))
# print(len(y))
normalizer = preprocessing.Normalizer().fit(X)
X=normalizer.transform(X)

filename = 'finalized_model.sav'
svclassifier = pickle.load(open(filename, 'rb'))

y_pred = svclassifier.predict(X)
acu =accuracy_score(y, y_pred )

df_confusion = confusion_matrix(y, y_pred)


print(np.argmax(df_confusion[0]))

