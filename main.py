import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import argparse
import collections
import collections.abc
import csv
import simplejson as json


# filename = r'C:/Users\Asus\Downloads/yelp_academic_dataset_business.json/yelp_academic_dataset_business'

filename_review = r'C:/Users\Asus\Downloads/yelp_academic_dataset_review.json/yelp_academic_dataset_review'




# filename = "yelp_academic_dataset_user"

data = [json.loads(line)
        for line in open(filename_review+'.json', 'r', encoding='utf-8')]
employee_data = data

data_file = open(filename_review+'.csv', 'w', encoding="utf-8")

csv_writer = csv.writer(data_file)

count = 0

for emp in employee_data:
    if count == 0:
        header = emp.keys()
        csv_writer.writerow(header)
        count += 1
    csv_writer.writerow(emp.values())

data_file.close()





# def get_nested_value(d, key):
#     if d is None:
#         return None
#     if '.' not in key:
#         if key not in d:
#             return None
#         return d[key]
#     base_key, sub_key = key.split('.', 1)
#     if base_key not in d:
#         return None
#     sub_dict = d[base_key]
#     return get_nested_value(sub_dict, sub_key)



# def get_row(line_contents, column_names):
#     row = []
#     for column_name in column_names:
#         line_value = get_nested_value(
#             line_contents,
#             column_name,
#         )
#         if isinstance(line_value, str):
#             row.append('{0}'.format(line_value.encode('utf-8')))
#         elif line_value is not None:
#             row.append('{0}'.format(line_value))
#         else:
#             row.append('')
#     return row


# def read_and_write_file(json_file_path, csv_file_path, column_names):
#         with open(csv_file_path, 'w+') as fout:
#             csv_file = csv.writer(fout)
#             csv_file.writerow(list(column_names))
#             with open(json_file_path,encoding='utf-8') as fin:
#                 for line in fin:
#                     line_contents = json.loads(line)
#                     csv_file.writerow(get_row(line_contents, column_names))



# def get_column_names(line_contents, parent_key=''):
#     column_names = []
#     for k, v in line_contents.items():
        
#         column_name = "{0}.{1}".format(parent_key, k) if parent_key else k
        
#         if isinstance(v, collections.abc.MutableMapping):
#             column_names.extend(
#                 get_column_names(v, column_name).items()
#             )
#         else:
#             column_names.append((column_name, v))
#     return dict(column_names)


# def get_superset_of_column_names_from_file(json_file_path):
#     """Read in the json dataset file and return the superset of column names."""
#     column_names = set()
#     with open(json_file_path, encoding='utf-8') as fin:
#         for line in fin:
#             line_contents = json.loads(line)
#             column_names.update(
#                 set(get_column_names(line_contents).keys())
#             )
#     return column_names






# for path in [json_business_file_path, json_review_file_path]:
    
#     col_names = get_superset_of_column_names_from_file(path)
#     print(col_names)



# if __name__ == '__main__':
    
#     json_file = r'C:/Users\Asus\Downloads/yelp_academic_dataset_business.json/yelp_academic_dataset_business.json'

    
#     csv_file = r'C:/Users/Asus/Downloads/business_file.csv'
#     column_names = get_superset_of_column_names_from_file(json_file)
    
#     read_and_write_file(json_file, csv_file, column_names)
