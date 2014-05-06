// Largely unorganized variables and special functions for the game to use.

GAME_ID = "GATSBY" // id for game cookie
INV_CAP = 24; // number of items in inventory. max out to number in game.
HIGHLIGHT_COLOUR = "#fdf213"; // colour that highlighted words such as locations will appear.
INPUT_COLOUR = "#ffffff"; // colour that inputs will appear.
WORDS_TO_IGNORE = "about.with.around.under.over.do.go"; // words that are ignored by the game engine, separated with periods.
MANNER_FREQ = 5; // 1/MANNER_FREQ = chance that a character's specific mannerism text will appear.  0 means it won't happen.
START_LOC = outsidechrhouse; //The room that your character starts out in.  Don't put it in quotes.

MAX_SCORE = 12; // number of times the score will be increased throughout the course of the game.
// Scores include:
// C1: Reading the note, unlocking your house, returning the book, answering the phone, talking to Gatsby
// C2: getting on the train, drive to The Apartments, give Myrtle the wine, give Myrtle the ice, talk to Tom after the party ends
// C3: reading Gatsby's invitation

//The text of the opening story.
INTRO = "<font color=\"" + HIGHLIGHT_COLOUR + "\"><i>=== CHAPTER ONE: SUNDAY ===</i></font>\n\nYou are Nick Carraway, and you have learned from your father that you ought to reserve judgement about other people, because if you hold them up to your own moral standards, you will misunderstand them.  You also happen to be both highly moral and highly tolerant, at least, according to you.  Then there\'s this other guy named Gatsby, who represents everything you scorn, but -- because of your father\'s statement -- he ought to be exempt from your usual judgements.  As a matter of fact, his personality is nothing short of \"gorgeous\".\n\n";

tom_elevator_talk = "Tom: Come to lunch some day?\nYou ask where he'd like to go.\nTom: Anywhere is fine.\nYou agree.\nYou and Tom walk out the Hotel, drive to the station, wait for the train, and go your separate ways.  You decide it's about time to see Gatsby for yourself.\n\n<i><font color=\"" + HIGHLIGHT_COLOUR + "\">=== CHAPTER THREE: TUESDAY ===</font></i>\n\nYou wake up on a brand new day.  It's about 7 in the morning.  You find yourself in your bedroom.\n\n";


//Dummy functions that were once used.  They are still called by the engine, though.
function anywhere_do() {}
function set_gameflags() {}
function game_help() {}

//Initialize the Game
function initialiseGame() {
	sleep(drunkard); //Put drunkard to sleep
}

//Hints for the game
	var hint = new Object();
	hint[0] = "You should take the note and read it.";
	hint[1] = "Type TAKE NOTE and READ NOTE.";
	hint[2] = "Try going in your house.";
	hint[3] = "Your house key is south of the crossroads.";
	hint[4] = "Your house key is at the pond.  Go all the way south of the crossroads, then all the way west.";
	hint[5] = "You can see the key right now.  Type TAKE KEY to get it.";
	hint[6] = "Now that you have your key, you can go in your house.";
	hint[7] = "Go outside your house and type GO IN.";
	hint[8] = "You have to get Tom's book.  It is in your library.";
	hint[9] = "Now you have to give Tom his book.  He's on the other Egg.";
	hint[10] = "Find the sailor and talk to him to get there.";
	hint[11] = "Give Tom the book.";
	hint[12] = "Type \"give book to tom\".";
	hint[13] = "You need to talk to Jordan and Daisy.";
	hint[14] = "In order to talk to them, you need Tom to be distracted.";
	hint[15] = "Perhaps Tom would be distracted if he answered the phone in his office?";
	hint[16] = "Ask Tom about the phone.";
	hint[17] = "Find Tom and type \"ask tom about phone\"";
	hint[18] = "Daisy wants to talk to you.";
	hint[19] = "Talk to Tom.";
	hint[20] = "Did you notice that Gatsby is on the beach now?";
	hint[21] = "Try talking to Gatsby.";
	hint[22] = "You have a train ticket now.  Try going to the train station.  It's all the way to the west.";
	hint[23] = "Have you read the signpost at the train station?";
	hint[24] = "You need to wait for the train.  Simply type WAIT.";
	hint[25] = "Give your ticket to the conductor.";
	hint[26] = "Myrtle is in her room inside Mr. Wilson's shop.  Tom will guide you.";
	hint[27] = "Talk to Myrtle.  She's in the lobby of The Apartments.  Tom's car to the north can drive you there.";
	hint[28] = "Myrtle went up to her Apartment.  Go up there and talk to her again.";
	hint[29] = "Myrtle wants you to find wine and ice.  Try talking to her about these things to see what she suggests.";
	hint[30] = "You can get the wine and ice in any order.  I'll guide you to get the wine first.  Have you explored all of the Valley of Ashes yet?  Seen the drunk?  He probably knows something about alcohol, but he's asleep.";
	hint[31] = "There's a police station in town, and they have a keen interest about suspicious drunks.";
	hint[32] = "After you see the drunk, ask the officer about him.";
	hint[33] = "Now talk to the drunk.  Ask him about alcohol.";
	hint[34] = "The drunk wants some money.  But you don't have any.  However, you do have a token to allow you to gamble.";
	hint[35] = "There's a casino in the hotel.  Why don't you gamble there?";
	hint[36] = "Now take the money and give it to the drunk.";
	hint[37] = "Now you have the speakeasy password.  Go to Baravelli's and use it!";
	hint[38] = "Now you have the wine.  Go give it to Myrtle.";
	hint[39] = "You need to get the ice.  You know it's in the hotel basement.  Have you tried riding the elevator down there?";
	hint[40] = "You need a wrench.  Luckily you know a guy who uses wrenches reguarly.";
	hint[41] = "Ask George Wilson to give you a wrench and he will.";
	hint[42] = "Now give the wrench to the elevator boy and he'll fix the elevator.";
	hint[43] = "Now you need landlord authorization.  Have you found the landlord yet?";
	hint[44] = "The landlord is in the general store, south of Mr. Wilson's Shop.";
	hint[45] = "The landlord seems troubled.  Ask him about authorization.";
	hint[46] = "He wants some flowers.  But he really wants a vase with flowers filled with water.  Get that and give it to him.";
	hint[47] = "The vase is in Mr. Wilson's room, inside his shop.";
	hint[48] = "There are fresh cut flowers lying on the road north of The Apartments.";
	hint[49] = "You can fill the vase with water using the fountain in the park, northwest of Wilson's shop.";
	hint[50] = "Put the flowers in the vase and give the vase to the landlord.  Then ask the landlord for authorization again.";
	hint[51] = "Now use the elevator to go down and get the ice.";
	hint[52] = "Give the wine and ice to Myrtle and it will be time for a party!";
	hint[53] = "Talk to Myrtle.";
	hint[54] = "Talk to Catherine.";
	hint[55] = "There is a wine bottle in the dining room to the north.  Use it to get drunk!";

function game_hint() {
	if (gs("catherine") == 3) { return_hint(55); }
	else if (gs("party_is_go") == 2) { return_hint(54); }
	else if (gs("party_wine") == 1 && gs("party_ice") == 1) { return_hint(53); }
	else if (gs("party_wine") == 1 && in_inv(ice)) { return_hint(52); }
	else if (gs("party_wine") == 1 && gs("elevator_fixed") == 1 && gs("landlord_ready") == 1) { return_hint(51); }
	else if (gs("party_wine") == 1 && gs("elevator_fixed") == 1 && in_inv(vase) && gs("vase_filled") == 1 && gs("vase_flowered") == 1 && gs("landlord_ready") == 0) { return_hint(50); }
	else if (gs("party_wine") == 1 && gs("elevator_fixed") == 1 && in_inv(vase) && gs("said_hint_48") == 1 && gs("vase_filled") == 0) { return_hint(49); }
	else if (gs("party_wine") == 1 && gs("elevator_fixed") == 1 && in_inv(vase) && gs("said_hint_43") == 1 && !in_inv(flower) && thingloc(flower) != nowhere) { return_hint(48); }
	else if (gs("party_wine") == 1 && gs("elevator_fixed") == 1 && gs("said_hint_46") == 1) { return_hint(47); }
	else if (gs("party_wine") == 1 && gs("elevator_fixed") == 1 && gs("said_hint_45") == 1) { return_hint(46); }
	else if (gs("party_wine") == 1 && gs("elevator_fixed") == 1 && heroloc() == generalstore) { return_hint(45); }
	else if (gs("party_wine") == 1 && gs("elevator_fixed") == 1 && gs("said_hint_43") == 1 && heroloc() != generalstore) { return_hint(44); }
	else if (gs("party_wine") == 1 && gs("elevator_fixed") == 1 && heroloc() != generalstore) { return_hint(43); }
	else if (gs("party_wine") == 1 && in_inv(wrench)) { return_hint(42); }
	else if (gs("party_wine") == 1 && gs("talk_hint_40") == 1) { return_hint(41); }
	else if (gs("party_wine") == 1 && gs("said_hint_39") == 1) { return_hint(40); }
	else if (gs("party_wine") == 1 && gs("said_hint_38") == 1) { return_hint(39); }
	else if (gs("apt_talk") == 2 && in_inv(wine)) { return_hint(38); }
	else if (gs("apt_talk") == 2 && gs("speakeasypw") == 1) { return_hint(37); }
	else if (gs("apt_talk") == 2 && gs("talk_money_drunk") == 1 && in_inv(money)) { return_hint(36); }
	else if (gs("apt_talk") == 2 && gs("talk_money_drunk") == 1 && gs("said_hint_34") == 1) { return_hint(35); }
	else if (gs("apt_talk") == 2 && gs("talk_money_drunk") == 1) { return_hint(34); }
	else if (gs("apt_talk") == 2 && gs("drunkard_jailed") == 1) { return_hint(33); }
	else if (gs("apt_talk") == 2 && gs("seendrunkard") == 1) { return_hint(32); }
	else if (gs("apt_talk") == 2 && gs("said_hint_30") == 1) { return_hint(31); }
	else if (gs("apt_talk") == 2 && gs("said_hint_29") == 1) { return_hint(30); }
	else if (gs("apt_talk") == 2) { return_hint(29); }
	else if (gs("apt_talk") == 1) { return_hint(28); }
	else if (gs("myrtle_enter") == 2) { return_hint(27); }
	else if (gs("tom_follow") == 1) { return_hint(26); }
	else if (gs("train_here") == 1 && gs("gatsby_first") == 1) { return_hint(25); }
	else if (gs("said_hint_23") == 1) { return_hint(24); }
	else if (gs("gatsby_first") == 1 && heroloc() == station) { return_hint(23); }
	else if (gs("gatsby_first") == 1) { return_hint(22); }
	else if (gs("said_hint_20") == 1) { return_hint(21); }
	else if (gs("tom_ticket") == 1) { return_hint(20); }
	else if (gs("jordan_daisy_convo") == 1) { return_hint(19); }
	else if (gs("phone_answered") == 1) { return_hint(18); }
	else if (gs("said_hint_16") == 1 && gs("tom_booked") == 1) { return_hint(17); }
	else if (gs("said_hint_15") == 1 && gs("tom_booked") == 1) { return_hint(16); }
	else if (gs("said_hint_14") == 1 && gs("tom_booked") == 1) { return_hint(15); }
	else if (gs("said_hint_13") == 1 && gs("tom_booked") == 1) { return_hint(14); }
	else if (gs("tom_booked") == 1) { return_hint(13); }
	else if (gs("said_hint_11") == 1 && gs("tom_booked") == 0 && heroloc() == outsidebuchhouse) { return_hint(12); }
	else if (gs("tom_booked") == 0 && heroloc() == outsidebuchhouse) { return_hint(11); }
	else if (gs("said_hint_9") == 1 && gs("tom_booked") == 0) { return_hint(10); }
	else if (in_inv(book) && gs("tom_booked") == 0) { return_hint(9); }	
	else if (gs("in_home") == 1) { return_hint(8); }
	else if (gs("said_hint_6") && in_inv(key)) { return_hint(7); }
	else if (in_inv(key)) { return_hint(6); }
	else if (!in_inv(key) && heroloc() == pond) { return_hint(5); }
	else if (gs("said_hint_3") == 1) { return_hint(4); }
	else if (gs("said_hint_2") == 1) { return_hint(3); }
	else if (gs("note_call") == 1) { return_hint(2); }
	else if (gs("said_hint_0") == 1) { return_hint(1); }
	else { return_hint(0); }
}

function return_hint(num) {
	hint_prompt = "";
	if (gs("say_hint_prompt_once") == 0) { hint_prompt = "(If you're still stuck, type BABY MODE again for another hint, and more hints throughout the game.)"; }
	say("HINT: " + hint[num] + "\n" + hint_prompt);
	sgs("say_hint_prompt_once", 1);
	for (var i=0; i<=num; i++) {
		sgs("said_hint_" + i, 1);
	}
}

//This function can globally append text to every single room
function anywhere_append() {
	var txt = "";
	
	if (gs("note_call") == 0 && heroloc() != outsidechrhouse) {
		txt = "\nYou have a nagging feeling that you should have read that note.";
		sgs("note_call", 1);
	}

	if (gs("tom_follow") == 1) {
		if(personloc(tom) != heroloc()) {
			set_personloc(tom,heroloc());
			txt += "\nTom is following you.";
		}
	return(txt);
	}

	if (gs("jordan_follow") == 1) {
		if(personloc(jordan) != heroloc()) {
			set_personloc(jordan,heroloc());
			txt += "\nJordan is following you.";
		}
	return(txt);
	}
}


//This function allows you to examine something no matter where you are.
var anywhere_sights = "";
function anywhere_sight(sight, description) { anywhere_sights += '/' + sight + '::' + description; }

//Special commands that can work anywhere.
function anywhere_special() {
	if(Token_str.indexOf("fight.self")==0 || Token_str == "die") {
		say('You survive punching yourself in the face.')
		return(true);
	}
	if(Token_str.indexOf("kiss.self")==0) {
		say('You would have to find a mirror or reflective surface.  Weirdo.')
		return(true);
	}
	else if(Token[1]=='jump') {
		say('You can\'t jump very high.');
		return(true);
	}
	else if(Token[1]=='swear'||Token[2]=='swear') {
		swearcount = gs('swearcount');
		swearcount++;
		sgs('swearcount',swearcount);
		if (swearcount == 1) { say("Not in a text adventure!  You are one sick person!"); }
		else if (swearcount == 2) { say("Are you serious?  Stop it with the bad words!"); }
		else if (swearcount == 3) { say("I think you've had enough naughty language."); }
		else if (swearcount == 4) { say("Do I need to go get you a bar of soap?"); }
		else if (swearcount == 5) { say("Do you know I can kill your character off at will?"); }
		else if (swearcount == 6) { die("Okay, you're dead.  Happy?"); }
		return(true);
	}
	else if(Token[1]=='sit'||Token[1]=='sleep') {
		say('Lazy! You didn\'t work hard to leave the Midwest for the East just to lounge around like the Old Rich.  You have hard work to do!');
		return(true);
	}
	//The following are semi-edited Hamlet examples
	else if(Token[1] == "dig") {
		if(in_inv(shovel)) { say('The ground is too hard to dig here.'); }
		else { say('You haven\'t got anything to dig with.'); }
		return(true)
	}
	// The edited Hamlet example makes "polonius" means the dead body, but only if he's dead
	else if(gs("klpln") == 1 && Token_str.indexOf("polonius") != -1) {
		var tkns = Token_str.split(".");
		for(var i=0; i<tkns.length;i++) {
			if(tkns[i]=="polonius") { tkns[i] = "body"; }
		}
		Token_str = tkns.join(".");
		
		for(var i=1; i<=MAX_TOKENS; i++) {
			if(Token[i] == "polonius") { Token[i] = "body"; }
		}
	}
	
	else if(Token[1]=='cut'&&Token[2]!='nail')
	{
		if(in_inv(scissors) && !Token[2]) { say('I don\'t know what you want to cut.'); }
		else if(in_inv(scissors)) { say('There\'s nothing worth cutting here.'); }
		else {
			say('You haven\'t got anything to cut with.' +
			(in_inv(dagger) ? '\n(Daggers are for stabbing, not cutting.)' : '') );
		}
	return(true);
	}
	//End Hamlet

	return(false);
}