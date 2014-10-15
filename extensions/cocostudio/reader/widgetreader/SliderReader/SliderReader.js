/****************************************************************************
 Copyright (c) 2011-2012 cocos2d-x.org
 Copyright (c) 2013-2014 Chukong Technologies Inc.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

/**
 * The ccui.Slider's properties reader for GUIReader.
 * @class
 * @name ccs.SliderReader
 **/
ccs.SliderReader = /** @lends ccs.SliderReader# */{
    /**
     * Gets the ccs.SliderReader.
     * @deprecated since v3.0, please use ccs.SliderReader directly.
     * @returns {ccs.SliderReader}
     */
    getInstance: function(){
        return ccs.SliderReader;
    },

    /**
     * Sets ccui.Slider's properties from json dictionary.
     * @param {ccui.Slider} widget
     * @param {Object} options
     */
    setPropsFromJsonDictionary: function(widget, options){
        ccs.WidgetReader.setPropsFromJsonDictionary.call(this, widget, options);

        var jsonPath = ccs.uiReader.getFilePath();

        var slider = widget;
        var tp = jsonPath;

        var barTextureScale9Enable = options["scale9Enable"];
        slider.setScale9Enabled(barTextureScale9Enable);
        var bt = options["barFileName"];
        var barLength = options["length"];

        var imageFileNameDic = options["barFileNameData"];
        var imageFileType = imageFileNameDic["resourceType"];
        var imageFileName = imageFileNameDic["path"];
        var imageFileName_tp;

        if(bt != null){
            if(barTextureScale9Enable){
                switch(imageFileType){
                    case 0:
                        imageFileName_tp = imageFileName ?
                            ( tp + imageFileName ) :
                            null;
                        slider.loadBarTexture(imageFileName_tp);
                        break;
                    case 1:
                        slider.loadBarTexture(imageFileName, 1 /*ui.UI_TEX_TYPE_PLIST*/);
                        break;
                    default:
                        break;
                }
                slider.setSize(cc.size(barLength, slider.getContentSize().height));
            }
        }else{
            switch(imageFileType){
                case 0:
                    imageFileName_tp = imageFileName ?
                        tp + imageFileName :
                        null;
                        slider.loadBarTexture(imageFileName_tp);
                    break;
                case 1:
                    slider.loadBarTexture(imageFileName, 1 /*ui.UI_TEX_TYPE_PLIST*/);
                    break;
                default:
                    break;
            }
        }
        var normalDic = options["ballNormalData"];
        var normalType = normalDic["resourceType"];
        var normalFileName = normalDic["path"];
        switch(normalType){
            case 0:
                var normalFileName_tp = normalFileName ?
                    tp + normalFileName :
                    null;
                slider.loadSlidBallTextureNormal(normalFileName_tp);
                break;
            case 1:
                slider.loadSlidBallTextureNormal(normalFileName, 1/*ui.UI_TEX_TYPE_PLIST*/);
                break;
            default:
                break;
        }

        var pressedDic = options["ballPressedData"];
        var pressedType = pressedDic["resourceType"];
        var pressedFileName = pressedDic["path"];
        if(pressedFileName === null){
            pressedType = normalType;
            pressedFileName = normalFileName;
        }
        switch(pressedType){
            case 0:
                var pressedFileName_tp = pressedFileName ?
                    tp + pressedFileName :
                    null;
                slider.loadSlidBallTexturePressed(pressedFileName_tp);
                break;
            case 1:
                slider.loadSlidBallTexturePressed(pressedFileName, 1/*ui.UI_TEX_TYPE_PLIST*/);
                break;
            default:
                break;
        }
        var disabledDic = options["ballDisabledData"];
        var disabledType = disabledDic["resourceType"];
        var disabledFileName = disabledDic["path"];
        switch(disabledType){
            case 0:
                var disabledFileName_tp = disabledFileName ?
                    tp + disabledFileName :
                    null;
                slider.loadSlidBallTextureDisabled(disabledFileName_tp);
                break;
            case 1:
                slider.loadSlidBallTextureDisabled(disabledFileName, 1/*ui.UI_TEX_TYPE_PLIST*/);
                break;
            default:
                break;
        }
        var progressBarDic = options["progressBarData"];
        var progressBarType = progressBarDic["resourceType"];
        var imageProgressFileName = progressBarDic["path"];
        switch (progressBarType){
            case 0:
                var imageProgressFileName_tp = imageProgressFileName ?
                    (tp + imageProgressFileName) :
                    null;
                slider.loadProgressBarTexture(imageProgressFileName_tp);
                break;
            case 1:
                slider.loadProgressBarTexture(imageProgressFileName, 1/*ui.UI_TEX_TYPE_PLIST*/);
                break;
            default:
                break;
        }

        ccs.WidgetReader.setColorPropsFromJsonDictionary.call(this, widget, options);
    },

    setPropsFromProtocolBuffers: function(widget, nodeTree){
        ccs.WidgetReader.prototype.setPropsFromProtocolBuffers.call(this, widget, nodeTree);

        var slider = widget;
        var options = nodeTree.slideroptions();

		var protocolBuffersPath = ccs.uiReader.getFilePath();

        var barTextureScale9Enable = options.scale9enable();
        slider.setScale9Enabled(barTextureScale9Enable);

        slider.setPercent(options.percent());


        //        var bt = DICTOOL.checkObjectExist_json(options, P_BarFileName);
        var barLength = options.has_length() ? options.length() : 290;

		var imageFileNameDic = options.barfilenamedata();
        var imageFileNameType = imageFileNameDic.resourcetype();
		if (imageFileNameType == 1)
		{
			cc.SpriteFrameCache.addSpriteFramesWithFile(protocolBuffersPath + imageFileNameDic.plistfile());
		}
        var imageFileName = this.getResourcePath(imageFileNameDic.path(), imageFileNameType);
        slider.loadBarTexture(imageFileName, imageFileNameType);



        if (barTextureScale9Enable)
        {
            slider.setContentSize(cc.size(barLength, slider.getContentSize().height));
        }

        //loading normal slider ball texture
        var normalDic = options.ballnormaldata();
        var normalType = normalDic.resourcetype();
		if (normalType == 1)
		{
			cc.SpriteFrameCache.addSpriteFramesWithFile(protocolBuffersPath + normalDic.plistfile());
		}
        imageFileName = this.getResourcePath(normalDic.path(), normalType);
        slider.loadSlidBallTextureNormal(imageFileName, normalType);


        //loading slider ball press texture
        var pressedDic = options.ballpresseddata();
        var pressedType = pressedDic.resourcetype();
		if (pressedType == 1)
		{
			cc.SpriteFrameCache.addSpriteFramesWithFile(protocolBuffersPath + pressedDic.plistfile());
		}
        var pressedFileName = this.getResourcePath(pressedDic.path(), pressedType);
        slider.loadSlidBallTexturePressed(pressedFileName, pressedType);

        //loading silder ball disable texture
        var disabledDic = options.balldisableddata();
        var disabledType = disabledDic.resourcetype();
		if (disabledType == 1)
		{
			cc.SpriteFrameCache.addSpriteFramesWithFile(protocolBuffersPath + disabledDic.plistfile());
		}
        var disabledFileName = this.getResourcePath(disabledDic.path(), disabledType);
        slider.loadSlidBallTextureDisabled(disabledFileName, disabledType);

        //load slider progress texture
        var progressBarDic = options.progressbardata();
        var progressBarType = progressBarDic.resourcetype();
		if (progressBarType == 1)
		{
			cc.SpriteFrameCache.addSpriteFramesWithFile(protocolBuffersPath + progressBarDic.plistfile());
		}
        var progressBarFileName = this.getResourcePath(progressBarDic.path(), progressBarType);
        slider.loadProgressBarTexture(progressBarFileName, progressBarType);

        var displaystate = true;
		if(options.has_displaystate())
		{
			displaystate = options.displaystate();
		}
		slider.setBright(displaystate);

        // other commonly protperties
        ccs.WidgetReader.prototype.setColorPropsFromProtocolBuffers.call(this, widget, nodeTree);
    },

    setPropsFromXML:function(widget, objectData){
        ccs.WidgetReader.prototype.setPropsFromXML.call(this, widget, objectData);

        var slider = widget;

        var xmlPath = ccs.uiReader.getFilePath();

        var scale9Enabled = false;
        var cx = 0, cy = 0, cw = 0, ch = 0;
        var swf = 0, shf = 0;

        var percent = 0;

        var opacity = 255;

        // attributes
        var attribute = objectData.FirstAttribute();
        while (attribute)
        {
            var name = attribute.Name();
            var value = attribute.Value();

            if (name == "Scale9Enable")
            {
                if (value == "True")
                {
                    scale9Enabled = true;
                }
            }
            else if (name == "Scale9OriginX")
            {
                cx = atof(value.c_str());
            }
            else if (name == "Scale9OriginY")
            {
                cy = atof(value.c_str());
            }
            else if (name == "Scale9Width")
            {
                cw = atof(value.c_str());
            }
            else if (name == "Scale9Height")
            {
                ch = atof(value.c_str());
            }
            else if (name == "Length")
            {

            }
            else if (name == "PercentInfo")
            {
                percent = atoi(value.c_str());
            }
            else if (name == "DisplayState")
            {
                slider.setBright((value == "True") ? true : false);
                if (value == "False")
                {
                    slider.setTouchEnabled(false);
                }
            }
            else if (name == "Alpha")
            {
                opacity = atoi(value.c_str());
            }

            attribute = attribute.Next();
        }

        // child elements
        var child = objectData.FirstChildElement();
        while (child)
        {
            var name = child.Name();

            if (name == "BackGroundData")
            {
                var attribute = child.FirstAttribute();
                var resourceType = 0;
                var path = "", plistFile = "";

                while (attribute)
                {
                    var name = attribute.Name();
                    var value = attribute.Value();

                    if (name == "Path")
                    {
                        path = value;
                    }
                    else if (name == "Type")
                    {
                        resourceType = (value == "Normal" || value == "Default" || value == "MarkedSubImage") ? 0 : 1;
                    }
                    else if (name == "Plist")
                    {
                        plistFile = value;
                    }

                    attribute = attribute.Next();
                }

                switch (resourceType)
                {
                    case 0:
                    {
                        slider.loadBarTexture(xmlPath + path, ccui.Widget.TextureResType.LOCAL);
                        break;
                    }

                    case 1:
                    {
                        cc.SpriteFrameCache.addSpriteFramesWithFile(xmlPath + plistFile);
                        slider.loadBarTexture(path, ccui.Widget.TextureResType.PLIST);
                        break;
                    }

                    default:
                        break;
                }
            }
            else if (name == "BallNormalData")
            {
                var attribute = child.FirstAttribute();
                var resourceType = 0;
                var path = "", plistFile = "";

                while (attribute)
                {
                    var name = attribute.Name();
                    var value = attribute.Value();

                    if (name == "Path")
                    {
                        path = value;
                    }
                    else if (name == "Type")
                    {
                        resourceType = (value == "Normal" || value == "Default" || value == "MarkedSubImage") ? 0 : 1;
                    }
                    else if (name == "Plist")
                    {
                        plistFile = value;
                    }

                    attribute = attribute.Next();
                }

                switch (resourceType)
                {
                    case 0:
                    {
                        slider.loadSlidBallTextureNormal(xmlPath + path, ccui.Widget.TextureResType.LOCAL);
                        break;
                    }

                    case 1:
                    {
                        cc.SpriteFrameCache.addSpriteFramesWithFile(xmlPath + plistFile);
                        slider.loadSlidBallTextureNormal(path, ccui.Widget.TextureResType.PLIST);
                        break;
                    }

                    default:
                        break;
                }
            }
            else if (name == "BallPressedData")
            {
                var attribute = child.FirstAttribute();
                var resourceType = 0;
                var path = "", plistFile = "";

                while (attribute)
                {
                    var name = attribute.Name();
                    var value = attribute.Value();

                    if (name == "Path")
                    {
                        path = value;
                    }
                    else if (name == "Type")
                    {
                        resourceType = (value == "Normal" || value == "Default" || value == "MarkedSubImage") ? 0 : 1;
                    }
                    else if (name == "Plist")
                    {
                        plistFile = value;
                    }

                    attribute = attribute.Next();
                }

                switch (resourceType)
                {
                    case 0:
                    {
                        slider.loadSlidBallTexturePressed(xmlPath + path, ccui.Widget.TextureResType.LOCAL);
                        break;
                    }

                    case 1:
                    {
                        cc.SpriteFrameCache.addSpriteFramesWithFile(xmlPath + plistFile);
                        slider.loadSlidBallTexturePressed(path, ccui.Widget.TextureResType.PLIST);
                        break;
                    }

                    default:
                        break;
                }
            }
            else if (name == "BallDisabledData")
            {
                var attribute = child.FirstAttribute();
                var resourceType = 0;
                var path = "", plistFile = "";

                while (attribute)
                {
                    var name = attribute.Name();
                    var value = attribute.Value();

                    if (name == "Path")
                    {
                        path = value;
                    }
                    else if (name == "Type")
                    {
                        resourceType = (value == "Normal" || value == "Default" || value == "MarkedSubImage") ? 0 : 1;
                    }
                    else if (name == "Plist")
                    {
                        plistFile = value;
                    }

                    attribute = attribute.Next();
                }

                switch (resourceType)
                {
                    case 0:
                    {
                        slider.loadSlidBallTextureDisabled(xmlPath + path, Widget.TextureResType.LOCAL);
                        break;
                    }

                    case 1:
                    {
                        cc.SpriteFrameCache.addSpriteFramesWithFile(xmlPath + plistFile);
                        slider.loadSlidBallTextureDisabled(path, ccui.Widget.TextureResType.PLIST);
                        break;
                    }

                    default:
                        break;
                }
            }
            else if (name == "ProgressBarData")
            {
                var attribute = child.FirstAttribute();
                var resourceType = 0;
                var path = "", plistFile = "";

                while (attribute)
                {
                    var name = attribute.Name();
                    var value = attribute.Value();

                    if (name == "Path")
                    {
                        path = value;
                    }
                    else if (name == "Type")
                    {
                        resourceType = (value == "Normal" || value == "Default" || value == "MarkedSubImage") ? 0 : 1;
                    }
                    else if (name == "Plist")
                    {
                        plistFile = value;
                    }

                    attribute = attribute.Next();
                }

                switch (resourceType)
                {
                    case 0:
                    {
                        slider.loadProgressBarTexture(xmlPath + path, ccui.Widget.TextureResType.LOCAL);
                        break;
                    }

                    case 1:
                    {
                        cc.SpriteFrameCache.addSpriteFramesWithFile(xmlPath + plistFile);
                        slider.loadProgressBarTexture(path, ccui.Widget.TextureResType.PLIST);
                        break;
                    }

                    default:
                        break;
                }
            }

            child = child.NextSiblingElement();
        }

        slider.setScale9Enabled(scale9Enabled);

        if (scale9Enabled)
        {
            slider.setCapInsets(cc.rect(cx, cy, cw, ch));
            slider.setContentSize(cc.size(swf, shf));
        }

        slider.setPercent(percent);

        slider.setOpacity(opacity);
    }
};