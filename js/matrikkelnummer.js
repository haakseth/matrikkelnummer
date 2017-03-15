(
	function () {
		var midTextField, 
			knrTextField, gnrTextField, bnrTextField, fnrTextField, snrTextField,
			sokTextField, sokKommTextField,
			alertArea;
		
		window.onload = function () { 
			alertArea = $("#alert-area");
			sokKommTextField = $("#sokKomm");
			sokTextField = $("#sok");
			midTextField = $("#mid");
			knrTextField = $("#knr");
			gnrTextField = $("#gnr");
			bnrTextField = $("#bnr");
			fnrTextField = $("#fnr");
			snrTextField = $("#snr");
			$("#convert-mid-button").on('click', convertMid);
			$("#convert-mnr-button").on('click', convertMnr);
			$("#convert-sok-button").on('click', convertSok);
			$("#convert-komm-button").on('click', convertKomm);
            $("#add-mid-button").on('click', addMidTolist);
		};
        
        var setValues = function(knr, gnr, bnr, fnr, snr){
            midTextField.val(String("0000"   + knr).slice(-4)+
							String("00000"   + gnr).slice(-5)+
							String("0000"    + bnr).slice(-4)+
							String("0000"    + fnr).slice(-4)+
							String("000"     + snr).slice(-3));
			convertMid();
        }
        
        var addMidTolist = function(){
            var mid = midTextField.val();
            var midlist = $("#mid-list");
            if(mid.length===20){
                if(midlist.val().length>0){
                    midlist.val(midlist.val() + ",");
                }
                midlist.val(midlist.val() + mid);
            }else{
                alertArea.html("<div class='alert alert-warning' role='alert'>Mid må være 20 tegn ...</div>");
                setTimeout(function () {
                    alertArea.html("")
                }, 2000);            
            }
        }
        
        var convertKomm = function(){
            var knr=0, gnr=0,bnr=0,fnr=0,snr=0;
            var sokText     = sokKommTextField.val();
            var dashLoc     = sokText.indexOf("-");
            var slashLoc    = sokText.indexOf("/");
			knr             = parseInt(sokText.substring(0,dashLoc));
            gnr             = parseInt(sokText.substring(dashLoc+1,slashLoc));
            sokText         = sokText.substring(slashLoc+1);
            slashLoc        = sokText.indexOf("/");
            if(slashLoc<0){
                bnr = parseInt(sokText);
                setValues(knr, gnr, bnr, fnr, snr);
            }else{
                bnr         = parseInt(sokText.substring(0,slashLoc));
                sokText     = sokText.substring(slashLoc+1);
                slashLoc    = sokText.indexOf("/");
                if(slashLoc<0){
                    fnr = parseInt(sokText);
                    setValues(knr, gnr, bnr, fnr, snr);
                }else{
                    fnr     = parseInt(sokText.substring(0,slashLoc));
                    sokText = sokText.substring(slashLoc+1);
                    if(sokText.length>0){
                        snr     = parseInt(sokText);
                    }
                    setValues(knr, gnr, bnr, fnr, snr);
                }
            }
		}
		
		var convertMid = function(){
			if(midTextField.val().length === 20 ){
				var knr = getMidKnr();
				var gnr = getMidGnr();
				var bnr = getMidBnr();
				var fnr = getMidFnr();
				var snr = getMidSnr();
				
				knrTextField.val(knr);
				gnrTextField.val(gnr);
				bnrTextField.val(bnr);
				fnrTextField.val(fnr);
				snrTextField.val(snr);
				
				var sokestring = String("0000" + knr).slice(-4) + " " + gnr + "/" + bnr;
				if(fnr>0){
					sokestring += "/" + fnr;
				}
				if(snr>0){
					if(fnr===0){
						sokestring += "/0/" + snr
					}else{
						sokestring += "/" + snr;
					}
					
				}
				sokTextField.val(sokestring);
			} else{
				alertArea.html("<div class='alert alert-warning' role='alert'>Pass opp!</div>");
				setTimeout(function () {
					alertArea.html("")
				}, 2000);
				
			}
		}
		var convertMnr = function(){
			if(knrTextField.val().length > 0 && 
				gnrTextField.val().length > 0 && 
				bnrTextField.val().length > 0 && 
				knrTextField.val().length < 5 && 
				gnrTextField.val().length < 6 && 
				bnrTextField.val().length < 5 && 
				fnrTextField.val().length < 5 && 
				snrTextField.val().length < 4){
                setValues(knrTextField.val(),gnrTextField.val(),bnrTextField.val(),fnrTextField.val(),snrTextField.val());
			} else{
				alertArea.html("<div class='alert alert-warning' role='alert'>Pass opp!</div>");
				setTimeout(function () {
					alertArea.html("")
				}, 2000);
				
			}
		}
		var convertSok = function(){
			if(midTextField.val().length === 20){
				
				knrTextField.val(getMidKnr());
				gnrTextField.val(getMidGnr());
				bnrTextField.val(getMidBnr());
				fnrTextField.val(getMidFnr());
				snrTextField.val(getMidSnr());
			} else{
				alertArea.html("<div class='alert alert-warning' role='alert'>Pass opp!</div>");
				setTimeout(function () {
					alertArea.html("")
				}, 2000);
			}
		}
		
		var getMidKnr = function(){
			return parseInt(midTextField.val().substring(0,4));
		}
		var getMidGnr = function(){
				return parseInt(midTextField.val().substring(4,9));
		}
		var getMidBnr = function(){
				return parseInt(midTextField.val().substring(9,13));
		}
		var getMidFnr = function(){
				return parseInt(midTextField.val().substring(13,17));
		}
		var getMidSnr = function(){
				return parseInt(midTextField.val().substring(17,20));
		}
	}
)();