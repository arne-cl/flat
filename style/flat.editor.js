editoropen = false;


function showeditor(element) {

    if ((element) && ($(element).hasClass(view))) {
        if ((element.id)  && (annotations[element.id])) {            
            s = "";
            editoropen = true;
            sethover(element);
            editfields = 0;
            editdata = [];
            edittargets = [element.id];
            Object.keys(annotations[element.id]).forEach(function(annotationid){
                annotation = annotations[element.id][annotationid];
                if (viewannotations[annotation.type+"/" + annotation.set]) {
                    if (annotationtypenames[annotation.type]) {
                        label = annotationtypenames[annotation.type];
                    } else {
                        label = annotation.type;
                    }
                    if (annotation.set) {
                        setname = annotation.set;
                    } else {
                        setname = "";
                    }
                    s = s + "<tr><th>" + label + "<br /><span class=\"setname\">" + setname + "</span></th><td>";
                    s = s + "<input id=\"editfield" + editfields + "\" value=\"" + annotation.class + "\"/>";
                    //s = s + "<button id=\"editordelete" + editfields + "\">-</button>";
                    s = s + "</td></tr>";
                    editfields = editfields + 1;
                    editdataitem = {'type':annotation.type,'set':annotation.set, 'class':annotation.class, 'new': false, 'changed': false };
                    if (annotation.id) editdataitem.id = annotation.id;
                    editdata.push(editdataitem);
                }
                 
            });
            if (edittargets.length == 1) {
                idheader = "<div id=\"id\">" + element.id + "</div>"
            } else {
                idheader = "<div id=\"id\">Editing " + edittargets.length + " items!</div>"
            }

            //extra fields list
            editoraddablefields_options = "";
            editoraddablefields = [];
            Object.keys(declarations).forEach(function(annotationtype){
                Object.keys(declarations[annotationtype]).forEach(function(set){
                    if (viewannotations[annotationtype + "/" + set]) {
                        found = false;
                        editdata.forEach(function(editdataitem){
                            if ((editdataitem.type == annotationtype) && (editdataitem.set == set)) {
                                found = true; 
                                return true;
                            }
                        });
                        if (!found) {
                            editoraddablefields_options = editoraddablefields_options + "<option value=\"" + editoraddablefields.length + "\">" + annotationtype + "/" + set + "</option>";
                            editoraddablefields.push({'type': annotationtype, 'set': set});
                        }
                    }
                });
            });
            if (editoraddablefields_options) {
                $("#editoraddablefields").html(editoraddablefields_options);
                $("#editoraddfields").show();
            } else {
                $("#editoraddfields").hide();
            }

            //targets list
            edittargets_options = "";
            edittargets.forEach(function(edittarget){
                edittargets_options = edittargets_options + "<option value=\"" + edittarget + "\">" + edittarget + "</option>";
            });
            $("#editortargetlist").html(edittargets_options);



            s = idheader + "<table>"  + s + "</table>";
            $('#editor div.body').html(s);
            $('#editor').css({'display': 'block', 'top':mouseY+ 20, 'left':mouseX-200} );
            //configure actions and events for edit fields
            for (var i = 0; i < editfields;i++){
                $('#editfield'+i).click(function(){
                    index = 0;
                    for (var i = 0; i < editfields;i++) { if (this.id == "editfield" + i) { index = i; break; } }
                    editdata[index].delete = true;
                    if (!$(this).hasClass("changed")) $(this).addClass("changed");
                });
                /*$('#editordelete'+i).click(function(){
                    index = 0;
                    for (var i = 0; i < editfields;i++) { if (this.id == "editordelete" + i) { index = i; break; } }
                    editdata[index].delete = true;
                    $("#editfield" + index).val("");
                    if (!$(this).hasClass("changed")) $(this).addClass("changed");
                });*/
            }
            $('#editor').show();    
            $('#editor').draggable();    

        }
    }
}


function addeditorfield() {
}

function editor_onclick(element) {
    //open editor
    $('#info').hide();
    showeditor(element);
}

function editor_onmouseenter(element) {
    if (!editoropen) {
        sethover(element);
        showinfo(element);
    }
}


function editor_oninit() {
    viewer_oninit();
    $('#editordiscard').click(function(){
        $('#editor').hide();
        editoropen=false;
    });
}
