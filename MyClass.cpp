#include "MyClass.h"
#include <QDebug>

MyClass::MyClass(QObject *parent) : QObject(parent), timer(new QTimer(this))
{
    // 设置定时器，每隔 1 秒触发一次
    iTime = 0;
    connect(timer, &QTimer::timeout, this, &MyClass::updateMessage);
}

MyClass::~MyClass()
{
    // 确保定时器被销毁前停止
    if (timer->isActive()) {
        timer->stop();
    }
}
void MyClass::stopTimer()
{
    if (timer->isActive()) {
        timer->stop();
    }
}
void MyClass::startTimer()
{
    // 启动定时器
    if (!timer->isActive()) {
        iTime = 0;
        timer->start(1000);  // 1000 毫秒 = 1 秒
    }
}

void MyClass::updateMessage()
{
    // 创建一个 JSON 对象，每次更新时设置不同的值
    char cMinetime[20] = "";
    QString qMinetime;
    sprintf(cMinetime,"%d",iTime);
    qMinetime = cMinetime;

    QJsonObject jsonObject;
    jsonObject["timestamp"] = QDateTime::currentDateTime().toString();
    jsonObject["message"] = QString("Updated at: %1").arg(QDateTime::currentDateTime().toString());
    jsonObject["timer"] = qMinetime;

    qDebug()<<jsonObject["timer"];
    //qDebug()<<QString("Updated at: %1").arg(QDateTime::currentDateTime().toString());
    iTime++;
    // 发射带有 JSON 格式的信号
    emit messageChanged(jsonObject);
}
