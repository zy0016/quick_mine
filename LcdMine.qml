import QtQuick 2.0

Item {
    FontLoader {
        id: fontlcd
        source: "./DS-DIGI.TTF"
    }
    Text {
        id:lcdmine
        color:"black"
        text: ""
        font.family: fontlcd.name
        font.pixelSize: 50
    }
}
