import csv
from tabulate import tabulate
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import smtplib

import os
os.getcwd()

file_path = os.path.dirname(os.path.abspath(__file__))


def sendEmail(requestjson):
    import configparser
    config = configparser.ConfigParser()
    config.read(file_path+'/prop.ini')
    me = config.get('GMAIL_CREDENTIALS', 'USERNAME')
    password = config.get('GMAIL_CREDENTIALS', 'PASSWORD')
    # me = 'atasinath@gmail.com'
    # password = 'fsisjydwlxbgzilx'
    server = 'smtp.gmail.com:587'
    # you = 'atasi@thirdeyedata.io'
    you = requestjson['receiver']
    subject = requestjson['subject']
    tableData = requestjson['tablecontent']
    htmlType = requestjson['htmltype']

    text = """
    Hello, Friend.

    Here is your data:

    {table}

    Regards,

    Me"""

    html = """
    <html><body><p>Hello, Friend.</p>
    <p>Here is your data:</p>
    """+tableData+"""<p>Regards,</p>
    <p>Cloudhiti</p>
    </body></html>
    """

    #print(html)

    with open(file_path+'/input.csv') as input_file:
        reader = csv.reader(input_file)
        data = list(reader)

    if htmlType=="table":
        text = text.format(table=tabulate(data, headers="firstrow", tablefmt="grid"))
        html = html.format(table=tabulate(data, headers="firstrow", tablefmt="html"))



    message = MIMEMultipart(
        "alternative", None, [MIMEText(text), MIMEText(html, 'html')])

    message['Subject'] = subject
    message['From'] = me
    message['To'] = you
    server = smtplib.SMTP(server)
    server.ehlo()
    server.starttls()
    server.login(me, password)
    server.sendmail(me, you, message.as_string())
    server.quit()

# if _name_ == '__main__':
#     main(requestjson)
