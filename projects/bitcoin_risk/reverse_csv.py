import csv

output = []

with open('data/btc-d.csv', 'r') as textfile:
    for row in reversed(list(csv.reader(textfile))):
        output.append(row)
        print(row)

with open('data/btc-daily.csv', 'w') as f:
    writer = csv.writer(f)
    for row in output:
        writer.writerow(row)
