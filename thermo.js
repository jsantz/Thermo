	const ws = new WebSocket("ws://localhost:8888/websocket");
        ws.onopen = function() {
            ws.send("SocketOpened");
        };
    activerow = 0;
    activecol = 0;
    Selection = 0;
    var surfacedatas = getData();
    document.addEventListener("DOMContentLoaded", function() {


        // Instead of creating a new Handsontable instance
        // with the container element passed as an argument,
        // you can simply call .handsontable method on a jQuery DOM object.
        var $container = $("#Spreadsheet");
        var $textbar = $("#InputBox");

        $textbar.handsontable({
            data: [['']],
            rowHeaders: false,
            contextMenu: true,
            manualColumnFreeze: true,
            colWidths: 800,
            fillHandle: false,
            customBorders: [
                {
                    row: 0,
                    col: 0,
                    top: {
                        width: 2,
                        color: '#000000'
                    },
                    left: {
                        width: 2,
                        color: '#000000'
                    },
                    bottom: {
                        width: 2,
                        color: '#000000'
                    },
                    right: {
                        width: 2,
                        color: '#000000'
                    }
                }],
            colHeaders: ['Input'],
            columns: [
                {
                    type: 'autocomplete',
                    source: [
                        "therm:omega{CASRN='64-17-5'}",
                        "therm:LK_omega{425.6, 631.1, 32.1E5}",
                        "therm:omega_mixture{[0.025, 0.12], [0.3, 0.7]}",
                        "therm:StielPolar{647.3, 22048321.0, 0.344, CASRN='7732-18-5'}"],
                    strict: false
                }
            ]
        });

        $container.handsontable({
            data: getData(),
            rowHeaders: true,
            autoWrapRow: true,
            colHeaders: true,
            contextMenu: true,
            colWidths: 90,
            manualColumnResize: true,
            fillHandle: false,
            formulas: true
        });
        var Input = $("#InputBox").handsontable('getInstance');
        var hotInstance = $("#Spreadsheet").handsontable('getInstance');
        Input.addHook('afterOnCellMouseDown', function(){
            Selection = 0;
        });
        Input.addHook('afterChange', function() {
            if(Selection == 0){
                surfacedatas[activerow][activecol] = Input.getDataAtCell(0,0);
                SetInstanceData(surfacedatas, hotInstance, Input.getDataAtCell(0,0));
            }
        });

        hotInstance.addHook('afterSelectionEnd', function() {
            Selection = 1;
            cell = hotInstance.getActiveEditor();
            activerow = cell.row;
            activecol = cell.col;
            data = hotInstance.getDataAtCell(cell.row, cell.col);
            Input.setDataAtCell(0, 0, surfacedatas[activerow][activecol]);
            $('#rowcol').text('Editing: '+String.fromCharCode(parseInt(cell.col)+65) + String(parseInt(cell.row)+1));
            hotInstance.getActiveEditor().changecount = 0;
        });
        hotInstance.addHook('afterChange', function() {
            if(Selection == 1){
                hotInstance.getActiveEditor().changecount = hotInstance.getActiveEditor().changecount + 1;
                if(hotInstance.getActiveEditor().changecount > 1){
                    return;
                }
                cell = hotInstance.getActiveEditor();
                activerow = cell.row;
                activecol = cell.col;
                surfacedatas[activerow][activecol] = hotInstance.getDataAtCell(activerow,activecol);
                Input.setDataAtCell(0, 0, surfacedatas[activerow][activecol]);
                SetInstanceData(surfacedatas, hotInstance, Input.getDataAtCell(0,0));
                $('#rowcol').text('Editing: '+String.fromCharCode(parseInt(cell.col)+65) + String(parseInt(cell.row)+1));
            }
        })
    });

    function getData() {
        return [
            ['','','','','','','','','','',''],
            ['','','','','','','','','','',''],
            ['','','','','','','','','','',''],
            ['','','','','','','','','','',''],
            ['','','','','','','','','','',''],
            ['','','','','','','','','','',''],
            ['','','','','','','','','','',''],
            ['','','','','','','','','','',''],
            ['','','','','','','','','','',''],
            ['','','','','','','','','','',''],
            ['','','','','','','','','','','']
        ];

    }


    function SetInstanceData(surfacedatas, hotInstance, data){
        if(String(data).substring(0, 6) == "therm:"){
        	ws.send("(" + String(data).substring(6, String(data).length) + ")");
        	ws.onmessage = function (evt) {
        		hotInstance.setDataAtCell(activerow, activecol, evt.data);
     		};
        }

        else{
            hotInstance.setDataAtCell(activerow, activecol, surfacedatas[activerow][activecol]);
        }
    }

    ClearHelp = new MDiv('AcentricHelp');
    ClearHelp.height = '30px';
    ClearHelp.width = '90px';
    ClearHelp.Place('#HelpButtons');
    ClearHelp.Div.html('Clear Help');
    ClearHelp.Div.mouseover(function() {
        ClearHelp.Div.css("background-color", "#000000");
        ClearHelp.Div.css('color', "#FFFFFF");
    });
    ClearHelp.Div.mouseleave(function(){
        ClearHelp.Div.css("background-color", "#FFFFFF");
        ClearHelp.Div.css('color', "#000000");
    });
    ClearHelp.Div.mousedown(function(){
        $('#Docs').html("");
    });


    AcentricHelp = new MDiv('AcentricHelp');
    AcentricHelp.height = '30px';
    AcentricHelp.width = '90px';
    AcentricHelp.Place('#HelpButtons');
    AcentricHelp.Div.html('Acentric Help');
    AcentricHelp.Div.mouseover(function() {
        AcentricHelp.Div.css("background-color", "#000000");
        AcentricHelp.Div.css('color', "#FFFFFF");
    });
    AcentricHelp.Div.mouseleave(function(){
        AcentricHelp.Div.css("background-color", "#FFFFFF");
        AcentricHelp.Div.css('color', "#000000");
    });
    AcentricHelp.Div.mousedown(function(){
        Acentric = acentricHelp();
        $('#Docs').html("<br>" + Acentric);
    });

