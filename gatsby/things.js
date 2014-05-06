//	Things / objects found in the game.

var Thing = new Object;
NUM_THNG = 0;
function th(name, fullname, wearable, firstplace, description, uses, pluses) {
	Thing[++NUM_THNG] = new Object;
	Thing[NUM_THNG].id = NUM_THNG;
	Thing[NUM_THNG].name = name; // short version of name
	Thing[NUM_THNG].fullname = fullname; // full name
	Thing[NUM_THNG].wearable = wearable; // true for clothing
	Thing[NUM_THNG].firstplace = firstplace; // starting place
	Thing[NUM_THNG].description = description;
	Thing[NUM_THNG].uses = uses // general uses
	Thing[NUM_THNG].pluses = pluses; // place-uses: uses in specific places
	eval(name + " = Thing[" + NUM_THNG + "];");
}

function pldo(th) { return("does"); }

// Here come the list of things!  th("script name", "game name", "is it clothing?", "starting location", "description", "uses", "place specific uses");
th("note", "a note", false, outsidechrhouse, "*read_note()", "", "");
function read_note() {
	say("\"Dear Nick,\nPlease come over to my house for dinner.  My House is at East Egg, north of here, across the water.  You can take a boat there from the beach.\nFrom, Daisy.\n\nPS: Remember to bring Tom's book back.  Tom left it in the library in your house.\"");
	if (gs("note_call") == 0) { inc_score(); }
	sgs("note_call", 1);
	set_thingloc(book, chrlibrary);
}

th("key", "your house key", false, pond, "It's a small and shiny key that can open the door to your house.  Probably troubling that it was just lying around.  Best not drop it again.", "", "");

th("book", "Tom's Book", false, nowhere, "It's entitled \"The Rise of the Colored Empires\" by this man Goddard.  You have no idea how it got in your library and you're certianly not a racist.  Besides, you've only read the first couple of pages.", "", "");

th("bread", "a slice of bread", false, nowhere, "It's a little bit of bread.  Not quite enough to eat.", "eat::It doesn't really look like enough to feed you.  Besides, it's kind of old and crusty.", "");

th("ticket", "a train ticket", false, nowhere, "This small, stubby ticket is good for unlimited round trips between West Egg and New York City.", "", "");

th("token", "a token", false, nowhere, "This small, coin allows you to gamble at the casino.", "", "");

th("money", "ten bucks", false, nowhere, "A green, US, $10 bill.  Alexander Hamilton smiles back at you.  Ten bucks could buy quite a few things around here.", "", "");

th("wine", "a bottle of wine", false, nowhere, "A nice bottle of red wine, vintage, 1872.", "drink::*drink_wine()", "");
function drink_wine() {
	if (gs("party_is_go") < 2) { say("You've only been drunk once before, and now's not really a good time to start again."); }
	else {
		say("It was nine o'clock--almost immediately afterward you look at my watch and find it was ten. Catherine had fallen asleep, and you slump in the couch and watch Tom and Myrtle talk.  Some time toward midnight they stood face to face discussing in impassioned voices whether Mrs. Wilson had any right to mention Daisy's name.\n\nMyrtle: Daisy! Daisy! Daisy! I'll say it when I want to! Daisy! Daisy!\n\nAt that moment, Tom hits Myrtle with his open hand and breaks her nose.\nWith bloody towels upon the bathroom floor and lots of scolding and confusion, Catherine awakes and everyone turns to leave.  You walk out to the elevator with Tom.\n\n");
		set_heroloc(aptelevator2);
		set_personloc(tom, aptelevator2);
		set_personloc(myrtle, nowhere);
		set_personloc(catherine, nowhere);
		sgs("party_is_go",3);
		take_away(wine);
		sent_look = true;
		look();
	}
}

th("wrench", "a wrench", false, nowhere, "A nice, sturdy, light-weight, fix 'em up kind of wrench.", "", "");

th("flower", "some cut flowers", false, street6, "Looks like a small assortment of largely nondescript flowers.", "insert::*flowers_in_vase()", "");
function flowers_in_vase() {
	if (Token[3] == "vase") {
		if (in_inv(vase)) {
			say("You put the flowers in vase and arrange them nicely.");
			sgs("vase_flowered",1);
			take_away(flower);
		}
		else { say("You don't have the vase."); }
	}
	else { say("It wouldn't make much sense to put the flowers into that."); }
}

th("vase", "a vase", false, wilsroom, "[[ describe_vase() ]]", "empty::*empty_vase()", "");
function describe_vase() {
	if (gs("vase_flowered") == 0 && gs("vase_watered") == 0) { say("An empty vase.  Looks kind of nice."); }
	else if (gs("vase_flowered") == 1 && gs("vase_watered") == 0) { say("A nice vase with some flowers in it, but no water."); }
	else if (gs("vase_flowered") == 0 && gs("vase_watered") == 1) { say("A nice vase filled with some water, but is otherwise empty."); }
	else { say("A nice vase with some flowers and water.  Looks very presentable."); }
}
function empty_vase() {
	if (gs("vase_watered") == 1 && gs("vase_flowered") == 0) {
		say("You pour all the water out of the vase.");
		sgs("vase_watered",0);
	}
	else if (gs("vase_watered") == 1 && gs("vase_flowered") == 1) {
		say("You pour all the water out of the vase and pour the flowers onto the ground.");
		sgs("vase_watered",0);
		sgs("vase_flowered",0);
		drop(flower);
	}
	else if (gs("vase_watered") == 0 && gs("vase_flowered") == 1) {
		say("You pour pour the flowers onto the ground.");
		sgs("vase_flowered",0);
		take_away(flower);
		set_thingloc(flower,heroloc());
	}
	else { say("There is nothing in the vase."); }
}

th("ice", "ice", false, aptfreezer, "It's cold.", "eat::You probably shouldn't be eating the things you need for the party.  That's rude.", "");

th("suit", "your suit", true, chrcloset, "A dapper suit complete with pocket square.  Perhaps you could wear this and look richer than you are.  Not that you aren't rich, of course.", "", "");

th("hat", "your hat", true, chrcloset, "A very fine hat.", "", "");

th("invitation", "invitation", false, nowhere, "*read_invitation()", "", "");
function read_invitation() {
	say("\"THE HONOR WOULD BE ENTIRELY MINE\nIF YOU ATTENDED A LITTLE PARTY\nTHIS NIGHT AT MY MANSION\n- JAY GATSBY\"\n\nYou admit to yourself that the mystery of Gatsby is alluring, and you'd love to go.  You can't help but think that getting one of these invitations might mean that Gatsby is reaching out to you, but you perish that thought after thinking it.  Still, you'd like to meet him.  You set out to work for the day in New York and come back in time for the party.\n\nTime passes...\n\n");
	if (gs("invite_score") == 0) { inc_score(); }
	sgs("invite_score", 1);
	sgs("gtsbygate_open", 1);
	set_heroloc(outsidegtsbymansion);
	sent_look = true;
	look();
}