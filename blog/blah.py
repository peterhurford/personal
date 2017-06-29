model = VW()
data = model.extract("titanic.csv")
data = data.format(line_function)
train_data, test_data = data.test_train_split([.8, .2])
model.set_server(cores=36, machines=3)
model.param_search("grid_search", passes=[3, 5], l1=[0.0001, 0.01], l2=[0.001, 0.01])
model.fit(train_data)
model.evaluate(test_data, metric="auc")
model.update(test_data)
model.deploy("localhost:4040/api")
model.run()


