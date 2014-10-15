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
 * The ccui.CheckBox's properties reader for GUIReader.
 * @class
 * @name ccs.CheckBoxReader
 **/
ccs.CheckBoxReader = /** @lends ccs.CheckBoxReader# */{
    /**
     * Gets the ccs.CheckBoxReader.
     * @deprecated since v3.0, please use ccs.CheckBoxReader directly.
     * @returns {ccs.CheckBoxReader}
     */
    getInstance: function(){
        return ccs.CheckBoxReader;
    },

    /**
     * Sets ccui.CheckBox's properties from json dictionary.
     * @param {ccui.CheckBox} widget
     * @param {Object} options
     */
    setPropsFromJsonDictionary: function(widget, options){
        ccs.WidgetReader.setPropsFromJsonDictionary.call(this, widget, options);

        var checkBox = widget;

        //load background image
        var backGroundDic = options["backGroundBoxData"];
        var backGroundType = backGroundDic["resourceType"];
        var backGroundTexturePath = ccs.WidgetReader._getResourcePath(backGroundDic, "path", backGroundType);
        checkBox.loadTextureBackGround(backGroundTexturePath, backGroundType);

        //load background selected image
        var backGroundSelectedDic = options["backGroundBoxSelectedData"];
        var backGroundSelectedType = backGroundSelectedDic["resourceType"];
        var backGroundSelectedTexturePath = ccs.WidgetReader._getResourcePath(backGroundSelectedDic, "path", backGroundSelectedType);
        if(!backGroundSelectedTexturePath){
            backGroundSelectedType = backGroundType;
            backGroundSelectedTexturePath = backGroundTexturePath;
        }
        checkBox.loadTextureBackGroundSelected(backGroundSelectedTexturePath, backGroundSelectedType);

        //load frontCross image
        var frontCrossDic = options["frontCrossData"];
        var frontCrossType = frontCrossDic["resourceType"];
        var frontCrossFileName = ccs.WidgetReader._getResourcePath(frontCrossDic, "path", frontCrossType);
        checkBox.loadTextureFrontCross(frontCrossFileName, frontCrossType);

        //load backGroundBoxDisabledData
        var backGroundDisabledDic = options["backGroundBoxDisabledData"];
        var backGroundDisabledType = backGroundDisabledDic["resourceType"];
        var backGroundDisabledFileName = ccs.WidgetReader._getResourcePath(backGroundDisabledDic, "path", backGroundDisabledType);
        if(!backGroundDisabledFileName){
            backGroundDisabledType = frontCrossType;
            backGroundDisabledFileName = frontCrossFileName;
        }
        checkBox.loadTextureBackGroundDisabled(backGroundDisabledFileName, backGroundDisabledType);

        ///load frontCrossDisabledData
        var frontCrossDisabledDic = options["frontCrossDisabledData"];
        var frontCrossDisabledType = frontCrossDisabledDic["resourceType"];
        var frontCrossDisabledFileName = ccs.WidgetReader._getResourcePath(frontCrossDisabledDic, "path", frontCrossDisabledType);
        checkBox.loadTextureFrontCrossDisabled(frontCrossDisabledFileName, frontCrossDisabledType);

        if (options["selectedState"])
            checkBox.setSelectedState(options["selectedState"]);

        ccs.WidgetReader.setColorPropsFromJsonDictionary.call(this, widget, options);
    },

    setPropsFromProtocolBuffers: function(widget, nodeTree){
        ccs.WidgetReader.prototype.setPropsFromProtocolBuffers.call(this, widget, nodeTree);

        var checkBox = widget;
        var options = nodeTree.checkboxoptions();

		var protocolBuffersPath = ccs.uiReader.getFilePath();

        //load background image
		var  backGroundDic = options.backgroundboxdata();
        var backGroundType = backGroundDic.resourcetype();
		if (backGroundType == 1)
		{
			cc.SpriteFrameCache.addSpriteFramesWithFile(protocolBuffersPath + backGroundDic.plistfile());
		}
        var backGroundTexturePath = this.getResourcePath(backGroundDic.path(), backGroundType);
        checkBox.loadTextureBackGround(backGroundTexturePath, backGroundType);

        //load background selected image
        var  backGroundSelectedDic = options.backgroundboxselecteddata();
        var backGroundSelectedType = backGroundSelectedDic.resourcetype();
		if (backGroundSelectedType == 1)
		{
			cc.SpriteFrameCache.addSpriteFramesWithFile(protocolBuffersPath + backGroundSelectedDic.plistfile());
		}
        var backGroundSelectedTexturePath = this.getResourcePath(backGroundSelectedDic.path(), backGroundSelectedType);
        checkBox.loadTextureBackGroundSelected(backGroundSelectedTexturePath, backGroundSelectedType);

        //load frontCross image
        var  frontCrossDic = options.frontcrossdata();
        var frontCrossType = frontCrossDic.resourcetype();
		if (frontCrossType == 1)
		{
			cc.SpriteFrameCache.addSpriteFramesWithFile(protocolBuffersPath + frontCrossDic.plistfile());
		}
        var frontCrossFileName = this.getResourcePath(frontCrossDic.path(), frontCrossType);
        checkBox.loadTextureFrontCross(frontCrossFileName, frontCrossType);

        //load backGroundBoxDisabledData
        var  backGroundDisabledDic = options.backgroundboxdisableddata();
        var backGroundDisabledType = backGroundDisabledDic.resourcetype();
		if (backGroundDisabledType == 1)
		{
			cc.SpriteFrameCache.addSpriteFramesWithFile(protocolBuffersPath + backGroundDisabledDic.plistfile());
		}
        var backGroundDisabledFileName = this.getResourcePath(backGroundDisabledDic.path(), backGroundDisabledType);
        checkBox.loadTextureBackGroundDisabled(backGroundDisabledFileName, backGroundDisabledType);

        ///load frontCrossDisabledData
        var  frontCrossDisabledDic = options.frontcrossdisableddata();
        var frontCrossDisabledType = frontCrossDisabledDic.resourcetype();
		if (frontCrossDisabledType == 1)
		{
			cc.SpriteFrameCache.addSpriteFramesWithFile(protocolBuffersPath + frontCrossDisabledDic.plistfile());
		}
        var frontCrossDisabledFileName = this.getResourcePath(frontCrossDisabledDic.path(), frontCrossDisabledType);
        checkBox.loadTextureFrontCrossDisabled(frontCrossDisabledFileName, frontCrossDisabledType);

        checkBox.setSelectedState(options.selectedstate());

		var displaystate = true;
		if(options.has_displaystate())
		{
			displaystate = options.displaystate();
		}
		checkBox.setBright(displaystate);

        // other commonly protperties
        ccs.WidgetReader.prototype.setColorPropsFromProtocolBuffers.call(this, widget, nodeTree);
    },

    setPropsFromXML: function(widget, objectData){
        ccs.WidgetReader.setPropsFromXML.call(this, widget, objectData);

        var checkBox = widget;

        var xmlPath = ccs.uiReader.getFilePath();

        var opacity = 255;

        // attributes
        var attribute = objectData.FirstAttribute();
        while (attribute)
        {
            var name = attribute.Name();
            var value = attribute.Value();

            if (name == "CheckedState")
            {
                checkBox.setSelectedState((value == "True") ? true : false);
            }
            else if (name == "DisplayState")
            {
                checkBox.setBright((value == "True") ? true : false);
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

            if (name == "NormalBackFileData")
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
                        resourceType = this.getResourceType(value);
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
                        checkBox.loadTextureBackGround(xmlPath + path, ccui.Widget.TextureResType.LOCAL);
                        break;
                    }

                    case 1:
                    {
                        cc.SpriteFrameCache.addSpriteFramesWithFile(xmlPath + plistFile);
                        checkBox.loadTextureBackGround(path, ccui.Widget.TextureResType.PLIST);
                        break;
                    }

                    default:
                        break;
                }
            }
            else if (name == "PressedBackFileData")
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
                        resourceType = this.getResourceType(value);
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
                        checkBox.loadTextureBackGroundSelected(xmlPath + path, ccui.Widget.TextureResType.LOCAL);
                        break;
                    }

                    case 1:
                    {
                        cc.SpriteFrameCache.addSpriteFramesWithFile(xmlPath + plistFile);
                        checkBox.loadTextureBackGroundSelected(path, ccui.Widget.TextureResType.PLIST);
                        break;
                    }

                    default:
                        break;
                }
            }
            else if (name == "NodeNormalFileData")
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
                        resourceType = this.getResourceType(value);
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
                        checkBox.loadTextureFrontCross(xmlPath + path, ccui.Widget.TextureResType.LOCAL);
                        break;
                    }

                    case 1:
                    {
                        cc.SpriteFrameCache.addSpriteFramesWithFile(xmlPath + plistFile);
                        checkBox.loadTextureFrontCross(path, ccui.Widget.TextureResType.PLIST);
                        break;
                    }

                    default:
                        break;
                }
            }
            else if (name == "DisableBackFileData")
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
                        resourceType = this.getResourceType(value);
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
                        checkBox.loadTextureBackGroundDisabled(xmlPath + path, ccui.Widget.TextureResType.LOCAL);
                        break;
                    }

                    case 1:
                    {
                        cc.SpriteFrameCache.addSpriteFramesWithFile(xmlPath + plistFile);
                        checkBox.loadTextureBackGroundDisabled(path, ccui.Widget.TextureResType.PLIST);
                        break;
                    }

                    default:
                        break;
                }
            }
            else if (name == "NodeDisableFileData")
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
						resourceType = this.getResourceType(value);
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
                        checkBox.loadTextureFrontCrossDisabled(xmlPath + path, ccui.Widget.TextureResType.LOCAL);
                        break;
                    }

                    case 1:
                    {
                        cc.SpriteFrameCache.addSpriteFramesWithFile(xmlPath + plistFile);
                        checkBox.loadTextureFrontCrossDisabled(path, ccui.Widget.TextureResType.PLIST);
                        break;
                    }

                    default:
                        break;
                }
            }

            child = child.NextSiblingElement();
        }

        checkBox.setOpacity(opacity);
    },

    getResourceType: function(key)
	{
		if(key == "Normal" || key == "Default" || key == "MarkedSubImage")
		{
			return 	0;
		}

		return 1;
	}

};