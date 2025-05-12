#ifndef MYCLASS_H
#define MYCLASS_H

#include <QObject>
#include <QTimer>
#include <QJsonObject>
#include <QJsonDocument>
#include <QDateTime>

class MyClass : public QObject
{
    Q_OBJECT

public:
    explicit MyClass(QObject *parent = nullptr);
    ~MyClass();
    int iTime;
signals:
    // 定义一个带参数的信号，参数为 JSON 对象
    void messageChanged(const QJsonObject &message);

public slots:
    // 一个槽，用于启动定时器
    void startTimer();
    void stopTimer();
private slots:
    // 定时器槽，每次触发时更新 JSON 数据并发射信号
    void updateMessage();

private:
    QTimer *timer;  // 定时器
};

#endif // MYCLASS_H
