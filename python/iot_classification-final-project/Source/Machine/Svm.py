from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
from sklearn.svm import SVC
from sklearn import preprocessing
import pandas as pd
import numpy as np

import re, pickle, sys


# # Assign colum names to the dataset
#
# # Read dataset to pandas dataframe
def run(path):
    url = r'' + path
    data = pd.read_csv(url, header=None, dtype=np.dtype("Float64"))
    X = data.drop(0, axis=1)
    y = data[0]
    normalizer = preprocessing.Normalizer().fit(X)
    X = normalizer.transform(X)

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.20)

    svclassifier = SVC(kernel='s'
                              'igmoid', gamma='scale')  # or 'sigmoid' or 'rbf'
    svclassifier.fit(X_train, y_train)

    filename = 'finalized_modelaa.sav'
    pickle.dump(svclassifier, open(filename, 'wb'))

    y_pred = svclassifier.predict(X_test)

    txt = classification_report(y_test, y_pred, digits=4)

    spl = re.findall("\d.\d+", txt)
    arr = [[], [], []]
    for i in range(1, 4):
        arr[0].append(spl[i])
        arr[1].append(spl[i + 4])
        arr[2].append(spl[i + 8])
    print(arr)


if __name__ == '__main__':
    file_path = str(sys.argv[1])
    run(file_path)

# acu =accuracy_score(y_test, y_pred )
# print(acu)
# df_confusion = confusion_matrix(y_test, y_pred)
# a=classification_report(y_test, y_pred, digits=4)
# print(df_confusion)
#
#
# print(classification_report(y_test, y_pred, digits=4))
