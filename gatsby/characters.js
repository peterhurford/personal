// Characters

var Person = new Object;
var guys = new Array;
NUM_CHRS = 0;
function ch(name, pname, firstplace, description, talks, subjects, reactions, presents, mannerisms) {
	Person[++NUM_CHRS] = new Object;
	Person[NUM_CHRS].id = NUM_CHRS;
	Person[NUM_CHRS].name = name.toLowerCase();
	Person[NUM_CHRS].fullname = name; // script name
	Person[NUM_CHRS].pname = pname; // true for proper names
	Person[NUM_CHRS].firstplace = firstplace; // starting place
	Person[NUM_CHRS].description = description;
	Person[NUM_CHRS].talks = talks; // default talks
	Person[NUM_CHRS].subjects = subjects; // talks about specific items
	Person[NUM_CHRS].reactions = reactions; // reactions to specific actions
	Person[NUM_CHRS].presents = presents; // reactions to certain things
	Person[NUM_CHRS].ishere = (pname ? name : ("A " + name)) + " is here." ;
	Person[NUM_CHRS].mannerisms = mannerisms ? mannerisms : "";
	eval(name.toLowerCase() + " = Person[" + NUM_CHRS + "];");
	eval("words(\"" + name.toLowerCase() + "\")");
}

function default_react(action,person) {
	var str = "";
	if (action == "fight") { str = "You take a swing, but " + the_person(person) + " ducks it."; }
	else if (action == "kiss") { str = "I don't think you and " + the_person(person) + " are close enough for that."; }
	else if (action == "wake" && asleep(person)) { str = capitalise(the_person(person)) + " won\'t wake up."; }
	else if (action == "wake") { str = capitalise(the_person(person)) + ' isn\'t asleep!'; }
	if(str=="") { return(false); }
	say(str);
	return(true);
}

////////////////////
// THE CHARACTERS //
////////////////////

//Conductor
ch("conductor", false, nowhere, "He\'s your sterotypical conductor, wearing suspenders and a funny hat and all that.", "The conductor says: \"If you have a ticket, make sure to board.  Next stop, Valley of Ashes!\"",
"train::Conductor: It\'s a commuter train that goes to Valley of Ashes.  If you have a ticket, you can travel on it.\
/ticket::*train_ticket()\
/gatsby::Conductor: He\'s an interesting and mysterious fella... I\'m not sure what he does in the Valley of Ashes.\
/tom::Conductor: He sure likes to visit the Valley of Ashes a lot.\
/myrtle::Conductor: She rides my train often. ...If you know what I mean.\
/daisy::Conductor: She\'s a very nice girl.\
/jordan::Conductor: Don't know her.",
"", "note::Conductor: That doesn't look like a ticket to me.  Nice try, though./\ticket::*train_ticket()",
"The conductor shouts: \"All aboard!\"\
/The conductor shouts: \"Next stop: Valley of Ashes! En route to New York City!\"\
/The conductor shouts: \"Have a ticket?  Get on board!\"");
function train_ticket() {
	if (in_inv(ticket)) {
		say("You get on board the train, heading to New York, and Tom is already there.  However, once the train stops at the Valley of Ashes, Tom insists that you get off.\nTom: I want you to meet my girl.\nYou recall Myrtle, the woman on the phone you heard earlier, better known as Mrs. Wilson.  You protest initially, but eventually go along and get off.  The train continues on to New York without you.\n\n");
		set_heroloc(asheslanding);
		set_personloc(tom,asheslanding);
		sgs("tom_follow",1)
		sent_look = true;
		look();
		if (gs("score_from_train") == 0) { inc_score(); sgs("score_from_train",1); }
	}
	else { say("Conductor: If you have one, come on aboard.  If you don\'t have one, well... find one."); }
}

//Sailor
ch("sailor", false, beach, "He\'s your sterotypical sailor, wearing a blue suit and with a beard.  If you talk to him, he\'ll take you to the other Egg.", "*egg_to_egg()", "", "fight::The sailor punches you right back.  Ow!  You stand back up and brush yourself off.", "", "The sailor shouts: \"I don't get paid to watch you, I get paid to sail you from Egg to Egg!\"");
function egg_to_egg() {
	var from = personloc(sailor);
	var to = 0;
	var to_egg = "";
	
	if(from == beach) {
		to = east_egg;
		to_egg = "East";
	}
	else {
		to = beach;
		to_egg = "West";
	}
	
	say("The sailor takes you into his sailboat, and sails you over to " + to_egg + " Egg.\n\n");
	set_heroloc(to);
	set_personloc(sailor,to);
	sent_look = true;
	look();	
//	for(var i=1; i<=NUM_THNG; i++) {
//		if(thingloc(Thing[i]) == from) { set_thingloc(Thing[i], to); }
//	}
//	for(var i=1; i<=NUM_CHRS; i++) {
//		if(personloc(Person[i]) == from) { set_personloc(Person[i], to); }
//	}
}
//You should be able to give the sailor something to have him sail you to Easter Egg.


//TOM
ch("Tom", true, outsidebuchhouse, "Tom is Daisy's husband, and a member of your social club at Yale.  He's a powerfully built, solid, stable, arrogant, racist, sexist, hypocritical bully.  He never considers trying to live up to the moral standards he demands from others.  But remember... you're not judgey.", "*tom_talk()",
'book::Tom: [[(gs("tom_booked") == 0) ? "Oh, that?  Can I have it back please?" : "Thanks for returning it!"]]\
/phone::Tom: [[(gs("tom_booked") == 0) ? "Huh?" : answer_phone_sitting()]]\
/daisy::Tom: Yeah, she\'s my hot wife.  Problem?\
/jordan::A good friend of ours.  Also really good at golf.  Except, y\'know, when she...um... draws outside the lines to get ahead.\
/gatsby::Mysterious feller.  I don\'t really hear much about him.  Tends to correspond a lot with Daisy, though.\
/yale::Tom: Good times.\
/dinner::Tom: Yes, you should eat dinner with us.  That\'s what we invited you for.\
/invitation::Tom: Yes, you should eat dinner with us.  That\'s what we invited you for.\
/racism::Tom: Hey, it\'s scientifically proven by this man Goddard.  We gotta watch out for our race.\
/goddard::Tom: He\'s a smart man.  He knows what he\'s doing and he\'ll stick up for us.\
/myrtle::Tom: Uh, you\'re not supposed to know about her.\
/car::Tom: [[(gs("tom_follow") == 0) ? "Where?" : "Yeah, I have a car up here, north of the shop."]]\
/conversation::Tom: [[(gs("phone_answered") == 0) ? "Huh?" : "Let\'s not worry about that."]]\
/wrench::Tom: Well, I certainly don\'t got one.  Don\'t see why you think I would.\
/password::Tom: The speakeasy password?  Oh, you can find it.  Some local probably knows.\
/affair::Tom: [[(gs("phone_answered") == 0) ? "Huh?" : "Let\'s not worry about that."]]',
"fight::Tom ducks your attack.\nTom: Just like back at Yale, huh?  Those college days...",
"book::*daisy_house()\
/bread::Tom: I'm not that hungry.\
/token::Tom: I'm not really the gambling type.\
/note::Tom: Yeah, it\'s our invitation.\
/money::Tom: I\'ve already got enough money, thanks.\
/wine::Tom: Save it for the party!\
/vase::Tom: Might be nice to give to Daisy, but I think you have more important uses for it.\
/flower::Tom: Looks pretty, but I think it\'s best that you keep it.", "[[tom_mannerism()]]");
function daisy_house() {
	take_away(book);
	say("Tom takes his book and tucks it under his jacket.\nTom: Thanks, old friend.  Please, come on in for dinner.");
	set_personloc(tom,buchsitting);
	sgs("tom_booked", 1);
	inc_score();
}
function tom_say() {
	if (gs("tom_booked") == 0) {
		says = new Array('"Hey, how are ya?  Do you have my book?"', '"What are you waiting for?  Do you have my book?"', '"You\'re not just going to stand around like that, are you?  Just give me my book."');
	}
	else if (gs("phone_answered") == 0) {
		says = new Array("I'm telling you, we have to stand up for the white race.", "If we don't do something, soon we'll be a white minority!", "This man Goddard's backed everything up with science!", "This book is indisputable.  We have to do something.");
	}
	else if (gs("jordan_daisy_convo") == 0) { return "Tom: Shh, I'm on the phone."; }
	else if (gs("tom_ticket") == 0) {
		give_hero(ticket);
		sgs("tom_ticket",1);
		set_personloc(gatsby,beach_road2);
		return "Tom: Jordan's a nice girl.  Well, I suppose you should get going too.  Hey, perhaps you could meet me down at New York City tomorrow?  Here's a ticket for the train.\nTom hands you a ticket, and you put it in your pocket.";
	}
	else if (gs("tom_follow") == 0 && gs("party_is_go") == 0) { return "Tom: Well, see you soon, my friend."; }
	else if (gs("myrtle_enter") == 0 && heroloc() != wilsshop) { return "Tom: Hey.  Let's go see Myrtle.  She's in Mr. Wilson's shop, right across from the train station.  I'll follow you."; }
	else if (gs("myrtle_enter") == 0) { return "Tom whispers to you: Hey, Myrtle's room is to the south.  Let's stop by."; }
	else if (gs("apt_talk") == 0 && gs("ashes_side") == 0) { return "Tom: Let's meet up with Myrtle at The Apartments.  We can use my car.  It's to the north of The Ashes." }
	else if (gs("apt_talk") == 0 && gs("ashes_side") == 1) { return "Tom: C'mon, let's meet up with Myrtle.  She's in the lobby."; }
	else if (gs("apt_talk") == 1) { return "Tom: C'mon, let's go upstairs to the apartment."; }
	else if (gs("party_is_go") < 2 && gs("ashes_side") == 0) { says = new Array("Let's not take too long here.", "The Valley of Ashes is a really desolate place.", "I think I got some ash on myself.", "Could you hurry up a bit?  We're making Myrtle wait."); }
	else if (gs("party_is_go") < 2 && gs("ashes_side") == 1) { says = new Array("Let's not take too long here.", "Aren't The Apartments beautiful?", "It's good to get away from all that ash...", "Could you hurry up a bit?  We're making Myrtle wait."); }
	else if (gs("party_is_go") == 2) { return "Tom grumbles and seems to focus all his attention on Myrtle."; }
	else if (gs("party_is_go") == 3) {
		say(tom_elevator_talk); // Should take place in the elevator.  Speech is in variables.js.
		set_personloc(tom, nowhere);
		set_personloc(butler, outsidechrhouse);
		set_personloc(jordan, gtsbybeach);
		set_personloc(catherine, gtsbyorchestra);
		inc_score();
		set_heroloc(chrbedroom);
		sgs("catherine",4);
		sgs("buchhouselock",1);
		sgs("party_is_go",4);
		sent_look = true;
		look();
		return false;
	}
	else { return "Uh..."; }
	return "Tom: " + says[Math.floor(Math.random()*says.length)];
}
function tom_talk() { say(tom_say()); }
function tom_mannerism() {
	if ((gs("jordan_daisy_convo") == 0 || gs("tom_ticket") == 1) && (heroloc() != wilsshop && heroloc() != mrswilsroom && heroloc() != tomaptliving && gs("party_is_go") != 3)) {
		return tom_say();
	}
}
function answer_phone_sitting() {
	if (gs("phone_answered") == 0) {
		say("Oh, the phone was ringing?  I didn't notice!\nHe rushes off to answer it.");
		set_personloc(tom,buchoffice);
		sgs("phone_answered",1);
		inc_score();
	}
	else if (gs("jordan_daisy_convo") == 0) { say("Tom is already on the phone and is having a very hushed conversation."); }
	else { say("Tom: Let's not worry about that."); }
}


//JORDAN
ch("Jordan", true, buchsitting, "Her pleasing contemptuous expression had looked out at you from many pictures of the sporting life at Asheville and Hot Springs and Palm Beach.  You also recall some story of her too, a critical, unpleasant story, but what it was you had forgotten long ago.", "*jordan_talk()", "", "", "", "Jordan sighs./\Jordan looks skeptical./\Jordan coughs in a condescending manner./\Jordan glares at you.");
function jordan_talk() {
	if (gs("phone_answered") == 0) { say("Jordan ignores you."); }
	else if (gs("jordan_daisy_convo") == 0) { jordan_daisy_convo(); }
	else if (gs("butler") == 1) {
		say("Jordan: I thought you might be here, given that you live so close.\nJordan looks about.  Eventually her friend Lucille wanders by and asks her about golf.\nLucille: Sorry you didn't win.\nShe was talking about Jordan's golf tournament.\nThey talk for awhile and you listen.  Eventually Lucille leaves.\nJordan: Let's get out.  This is much too polite for me.\nYou ask where she wants to go.\nJordan: Let's go find our esteemed host.  He's probably inside the mansion somewhere.  Let's go to the door.\nYou remark seeing a butler blocking the entrance.\nJordan: Won't be much of a problem for me.");
		sgs("jordan_follow", 1);
	}
	else { say("Jordan ignores you."); }
}


// DAISY
ch("Daisy", true, buchsitting, "She's your second cousin and has a very conscientious disposition.  She's very pretty, and frequently looks puzzled at Tom.", "*daisy_talk()", "", "", "", "[[daisy_mannerism()]]");
function daisy_talk() {
	if (gs("phone_answered") == 0) { say("Daisy: Hey, it's rude to talk while someone else is talking.  Listen to Tom."); }
	else { jordan_daisy_convo(); }
}
function daisy_mannerism() {
	if (gs("phone_answered") == 0) { says = new Array("Daisy leans back.", "Daisy looks around, nervously."); }
	else { says = new Array("Daisy: Hey Nick, why don't we have a chat?"); }
	say(says[Math.floor(Math.random()*says.length)]);
}
function jordan_daisy_convo() {
	if (gs("jordan_daisy_convo") == 0) {
		say("Before you can begin, Jordan perks up: Hey, you know, Tom's on the phone with his mistress in New York.\nDaisy interjects: Jordan, that's rude.  Not in front of Nick.\nDaisy: Anways, Nick, even though we're cousins, you haven't stopped by much.  You didn't even come to the wedding.\nYou remind Daisy you were still in the war.\nDaisy: Well, I suppose that's an excuse.  Anyways, I'm very cynical now.  All I hope is that my baby will grow up to be a fool.  A beautiful little fool.  Girls are better that way.\nYou remark that you don't really know that many people in West Egg.\nDaisy: Well, you know me.  And you know Tom and Jordan.  And surely you've heard of Gatsby.\nJordan: Gatsby?  That man feeds the ducks by my house every Tuesday, like clockwork.\nAt that moment, Tom wanders back in.  You all walk into the dining room, have a lovely dinner with more conversation, and then return to the sitting room.\n\nJordan: Well, I best be going.  I've got a golf tournament tomorrow.\nDaisy: And I best be putting the little baby to bed.\nBoth Daisy and Jordan leave the room.");
		set_personloc(daisy,nowhere);
		set_personloc(jordan,nowhere);
		set_personloc(tom,buchsitting);
		sgs("jordan_daisy_convo",1);
	}
}


// GATSBY
ch("Gatsby", true, nowhere, "A bit distant, it's hard to make out his features.  You can tell, however, that it's definitely Gatsby, and he's looking out to the beach starting at the green light on the dock.", "*gatsby_talk()", "", "fight::*die('Before you can get close enough, Gatsby pulls out a revolver and shoots you dead.')", "");
function gatsby_talk() {
	if (gs("gatsby_first") == 0) {
		say("You see Gatsby staring out into the beach at the green light, minute and far away, on the dock across the shore.  You think to talk to Gatsby, a man you've always admired but haven't yet met, but you decide against it, thinking he looks more comfortable alone.  He then stretches his arms out to the water toward the green light on the shore.  You look at the light, and by the time you look back at Gatsby, he's gone.\n\nYou decide to go home and sleep for the night.  You wake up the next morning, refreshed, ready to go see Tom in New York.\n\n<i><font color=\"" + HIGHLIGHT_COLOUR + "\">=== CHAPTER TWO: MONDAY ===</font></i>\n\n");
		set_personloc(gatsby, nowhere);
		inc_score();
		set_heroloc(outsidechrhouse);
		sgs("gatsby_first",1);
		sent_look = true;
		look();
	}
}


// GEORGE WILSON
ch("George", true, wilsshop, "He is a blonde, spiritless man, anaemic, and faintly handsome. When he saw us a damp gleam of hope sprang into his light blue eyes.", "Mr. Wilson kind of just looks over at Tom, looks at you, and says nothing.  Maybe you should ask him about something in particular?",
"ice::George: I wouldn't know where to find any, sorry.\
/wine::George: Have you tried over at Baravelli's?  Everyone knows they've got some wine.\
/myrtle::George: She's my wife.  Say, why are you so keen on talking about her?\
/tom::George: Can be a bit of a bastard sometimes, that bloke.  But still a good friend.\
/daisy::George: Daisy?  I think Tom mentioned she's his wife or something like that.\
/party::George: Certainly not here!\
/affair::George: Uh, Myrtle just went to go see her sister.  It'll be ok.\
/catherine::George: That's Myrtle's sister.  She's visiting with her right now.\
/car::George: I swear, I'll have it repared by the end of the week!\
/wrench::*want_wrench()\
/vase::*talk_take_vase_back()", "",
"/money::George: Unless you're buying services from me, you should probably keep it.\
/wine::George: The police station is too close, and they're vigilant.  Otherwise, I would.  Best keep that secret, kid.\
/vase::*take_vase_back()", "Mr. Wilson shifts to work on something with a wrench.");
function want_wrench() {
	if (gs("george_wrench") == 0) {
		say("George: You need a wrench?  Uh sure, take this one.\nGeorge hands you a wrench off of his shelf.");
		give_hero(wrench);
	}
	else { say("George: Eh, what's wrong with the wrench I already gave you?"); }
}
function take_vase_back() {
	say("George: Hey, that's my vase!  You theif!  I was saving that for Myrtle.\nGeorge walks to his room, puts the vase back, and then walks back.");
	take_away(vase);
	set_thingloc(vase,wilsroom);
}
function talk_take_vase_back() {
	if (in_inv(vase)) {
		say("George: Hey, that's my vase!  You theif!  I was saving that for Myrtle.\nGeorge walks to his room, puts the vase back, and then walks back.");
		take_away(vase);
		set_thingloc(vase,wilsroom);
	}
	else { say("George: It's going to be a surprise for Myrtle.  It's not done yet."); }
}

// MYRTLE WILSON (She is in the shop initially, but she's never stationary, so we might as well start the actual character in the apartment lobby)
ch("Myrtle", true, aptlobby, "She is in her middle thirties, and faintly stout, but she carried her surplus flesh sensuously as some women can. Her face, above a spotted dress of dark blue crepe-de-chine, contained no facet or gleam of beauty but there was an immediately perceptible vitality about her as if the nerves of her body were continually smouldering.", "*talk_myrtle()",
"ice::Myrtle: I think you can get some from the hotel basement.  Ask the elevator boy.\
/wine::Myrtle: Silly, it's the Prohibition.  But Baravelli's is a fine establishment for that sort of thing.  You'll need to get the speakeasy password, though.\
/george::Myrtle: Oh, him? I don't know why I married that silly thing.\
/tom::Myrtle: He's much more interesting than George, let me tell you.\
/daisy::Myrtle: Tom doesn't really want me talking about her.\
/gatsby::Myrtle: Can't say I know him very well, but I sure have heard rumors.  I've also seen him around the Valley a few times.  Strange fellow.\
/party::Myrtle: Yes, we're going to have a great party!\
/catherine::Myrtle: She's my sister. She's said to be very beautiful by people who ought to know.\
/wrench::Myrtle: What do I look like?  I'm certainly no mechanic, but my husband is.\
/password::Myrtle: The speakeasy password?  Oh, you can find it.  Some local probably knows.\
/speakeasy::Myrtle: You can get some wine from Baravelli's.", "fight::You punch Myrtle down to the ground.  She gets back up and brushes herself off.\nMyrtle: It's ok, I'm used to it.",
"wine::*myrtle_wine()\
/ice::*myrtle_ice()\
/bread::Myrtle: That's not going to go well with the kind of party I had in mind.\
/money::Myrtle: Um, I'm not that kind of girl.  At least not for just ten...", "");
function talk_myrtle() {
	if (gs("apt_talk") == 0) {
		say("Myrtle: Well, the apartment Tom keeps for me is on the top floor.  Come, I'll meet you there.  Just talk to the elevator boy.  Oh, and here's a token for the casino, if you're into that kind of thing.\nMrs. Wilson hands you a token, walks off into the elevator, and the doors close behind her.");
		give_hero(token);
		set_personloc(myrtle, tomaptliving);
		sgs("apt_talk",1);
	}
	else if (gs("apt_talk") == 1) {
		say("Myrtle: Well here we are.  We should be ready to have a party.  I'll telephone my sister Catherine.  Nick, do you think you could fetch us some wine and ice for the party?\nMyrtle calls someone on the telephone and then walks on back.");
		sgs("apt_talk",2);
	}
	else if (gs("party_is_go") == 0) {
		say("Myrtle: Nick, my sister should be here any moment.  You still need to fetch us");
		if (gs("party_wine") == 0) { say(" some wine"); }
		if (gs("party_wine") == 0 && gs("party_ice") == 0) { say(" and"); } 
		if (gs("party_ice") == 0) { say (" some ice"); }
		say (".");
	}
	else if (gs("party_is_go") == 1) {
		say("At that moment, Catherine arrives.\n\nMyrtle: My dear Catherine, many of these fellas cheat you every time.  I had a woman up here last week to look at my feet and when she gave me the bill you'd of thought she had my appendicitis out.\nTom: What was the name of the woman?\nMyrtle: Mrs. Eberhardt.\nThe sister Catherine prattled on about her husband being a photographer and then sits down beside you on the couch.");
		sgs("tom_follow",0);
		set_personloc(catherine, tomaptliving);
		set_thingloc(wine, tomaptdining);
		sgs("party_is_go",2);
	}
	else { say("Myrtle ignores you to keep talking to Tom."); }
}
function myrtle_wine() {
	take_away(wine);
	say("Myrtle takes the wine.\nMyrtle: Thanks!  We should really enjoy this one!");
	sgs("party_wine", 1);
	inc_score();
	if (gs("party_ice") == 1) {
		say ("\n");
		sgs("party_is_go",1);
		talk_to(myrtle);
	}
	else { say(" But we need still need some ice or the wine will get cold!"); }
}
function myrtle_ice() {
	take_away(ice);
	say("Myrtle takes the ice.\nMyrtle: Thanks!  We should really enjoy this one!");
	sgs("party_ice", 1);
	inc_score();
	if (gs("party_wine") == 1) {
		say("\n");
		sgs("party_is_go",1);
		talk_to(myrtle);
	}
	else { say (" But the ice won't be any good unless we have some wine to keep cold!"); }
}


// Elevator Boy
ch("boy", false, aptelevator, "He looks to be a small and scruffy child.  He's been hired to work the elevator here.", "Boy: What floor do you want?",
"ice::Boy: Yeah, we have some in the basement.  But something's stuck, and I'll need a wrench to fix the elevator to go down there.  And I'll need to be cleared by the landlord too.  Don't worry, though, the elevator goes up just fine.\
/basement::Boy: We could go down, but... something's stuck, and I'll need a wrench to fix the elevator to go down there.  And I'll need to be cleared by the landlord too.  Don't worry, though, the elevator goes up just fine.\
/lower::Boy: We could go down, but... something's stuck, and I'll need a wrench to fix the elevator to go down there.  And I'll need to be cleared by the landlord too.  Don't worry, though, the elevator goes up just fine.\
/wrench::Boy: Someone's got to have a wrench around here, somewhere.\
/landlord::Boy: I haven't seen him in a while, come to think of it.\
/elevator::Boy: Which way do you want to go?\
/house::Boy: I can take you there.\
/name::Boy: I'm not supposed to tell strangers my name.\
/ice::I'm too young for that sort of thing.", "",
"bread::I'm not that homeless.\
/wine::I'm a little underage for that kind of thing.  Besides, isn't it illegal?\
/wrench::*fix_elevator()\
/money::I've been told not to accept money from strangers.\
/authorization::gs('elevator_authorized') == 0 ? 'You need the landlord to clear you to go down.' : 'Sure, the landlord told me you are cleared to go down.'", "Boy: Why are you standing around in this elevator?  Want to go somewhere?");
function fix_elevator() {
	say("The boy takes the wrench, fiddles around with some things, and the elevator jolts a bit.\nBoy: There, all fixed.");
	take_away(wrench);
	sgs("elevator_fixed",1);
}


// Drunkard
ch("drunkard", false, alley2, "[[(gs('drunkard_jailed') == 0) ? 'He looks homeless, and is fast asleep passed out from drinking too much.' : 'He paces around his cell, and glares at you.']]", "The drunkard whispers: Geez, thanks for *hic* getting me locked up.",
"officer::The drunkard whispers: He's obviously corrupt.  The system has let us all down, man. *hic*\
/wine::*ask_about_speakeasy()\
/speakeasy::*ask_about_speakeasy()\
/drink::*ask_about_speakeasy()\
/password::*ask_about_speakeasy()",
"", "bread::The drunkard whispers: I'm not that desperate.  I'd rather have prison food.\
/note::The drunkard whispers: Who's Daisy? *hic* She sounds hot.\
/key::The drunkard whispers: If that's not a key to this cell, *hic* I'm not interested.\
/wine::*say_wine()\
/token::The drunkard whispers: Hey, *hic* maybe you can gamble that.\
/wrench::The drunkard whispers: I don't think that will *hic* break me out of here.\
/money::*say_speakeasy()", "The drunkard paces around in his cell.");
function say_wine() { say("The drunkard whispers: Don't mind *hic* if I do.\nOfficer: Hey! That's illegal!\nThe officer makes no motion to confiscate your wine."); }
function say_speakeasy() {
	say("You discreetly hand the money to the drunkard when the officer isn't looking.\nThe drunkard whispers: Oh, thanks.  The password to the speakeasy is swordfish.");
	sgs("speakeasypw",1);
	take_away(money);
}
function ask_about_speakeasy() {
	if (gs("speakeasypw") == 0) {
		say("The drunkard whispers: *hic* I'll tell you *hic* about the speakeasy, if you can get me some money. *hic*");
		gs("talk_money_drunk",1);
	}
	else { say("The drunkard whispers: Geez *hic*, did you forget already?  It's swordfish.  S-W-O-R-D-F-I-S-H. *hic*"); }
}


// Officer
ch("officer", false, ashpolice, "He looks vigilant, has a clean uniform, and a shiny badge.", "[[(personloc(drunkard) == ashpolice) ? 'Officer: Move along, citizen.' : 'Officer: If you see anything suspicious, be sure to report it.']]",
"corrupt::Officer: Who, me?\
/drunkard::*get_drunkard()\
/name::Officer: It's for the best if I stay anonymous.\
/speakeasy::Officer: I don't know anything about any speakeasies.\
/gatsby::Officer: I tend to look the other way.\
/swordfish::Uh... best not be saying that too much around here, ok?  I'm going to pretend you didn't say that.\
/money::Looking to bribe an officer of the law, eh?  Um... I can make arrangements.\
/bread::This looks like the kind of food we feed our prisoners.", "fight::*fight_officer()", "");
function get_drunkard() {
	if (gs("seendrunkard") == 0) { say("Officer: If you see any drunkards, let us know.  Alcohol is a crime."); }
	else if (personloc(drunkard) != heroloc()) {
		say("You inform the officer about the drunkard by the alley, and before you can do anything, the police officer runs out of the office, and comes back, dragging the drunkard in.\nOfficer: Don't you know alcohol is illegal?  We're going to be pressing charges.");
		set_personloc(drunkard, ashpolice);
		unsleep(drunkard);
		sgs("drunkard_jailed",1);
	}
	else { say("Officer: He'll be cooling his heels in here a little while until we can process him."); }
}
function fight_officer() { die("You take a swing at the officer, and he apprehends you and puts you in the jail.\nOfficer: Assault is a crime, you know."); }


// Landlord
ch("landlord", false, generalstore, "He's the landlord of The Apartments.  He's dressed in a spiffy suit and looks pretty grumpy.", "Landlord: Oh... I'm in so much trouble.",
"trouble::Landlord: Oh no. Oh no. My wife is mad at me and this store is all out of flowers.  You don't think you could get me some flowers, could ya?  Thanks!\
/authorization::*landlord_authorization()\
/ice::Landlord: Yeah, we have some ice in the basement of the hotel.\
/wrench::I didn't even know the elevator was broken.\
/elevator::It's broken?  Well, I trust the boy to fix it.\
/basement::*landlord_authorization()\
/lower::*landlord_authorization()", "",
"flower::Landlord: Uh, gee, thanks.  But you can keep that unless you can put it in a vase.\
/vase::*landlord_assess_vase()", "");
function landlord_assess_vase() {
	if (gs("vase_flowered") == 0 && gs("vase_watered") == 0) { say("Landlord: Nice vase you got there.  You can keep it unless you get some flowers do go with it, though."); }
	else if (gs("vase_flowered") == 1 && gs("vase_watered") == 0) { say("Landlord: Nice vase and nice flower.  But keep it unless you can get some water too so the flowers don't wilt."); }
	else if (gs("vase_flowered") == 0 && gs("vase_watered") == 1) { say("Landlord: Nice vase and water you got there.  But keep it unless you get some flowers to go with it."); }
	else {
		say("Landlord: That will do very nicely!  Thanks so much!");
		take_away(vase);
		sgs("landlord_ready",1);
	}
}
function landlord_authorization() {
	if (gs("landlord_ready") == 0) { say("Landlord: Tell you what, you can have authorization to the downstairs if you get me some flowers."); }
	else if (gs("elevator_authorized") == 0) {
		say("Landlord: Sure thing.  I'll go tell the elevator boy that you're authorized.\nThe landlord walks out of the store and then walks off.");
		sgs("elevator_authorized",1);
		set_personloc(landlord, nowhere);
	}
}


// BARAVELLI (the guy from Groucho Marx's "Horse Feathers" -- he's now owns his own speakeasy, and travelled ~10 years in the past)
ch("Baravelli", true, baravellis, "He's a nervous looking Italian who owns this establishment -- hence, why it's named after him.  He looks pretty shady.", "Howdy.  Welcome to our legal and completely reputable establishment.",
"wine::Baravelli: Nice try, no-a drinks alcholic here.  We comply with all 'da laws.\
/drink::Baravelli: Uh waddayouwant?  Nothing alcoholic here!\
/mary::*baravelli_mary()\
/sturgeon::*baravelli_sturgeon()\
/haddock::*baravelli_haddock()\
/swordfish::*baravelli_speakeasy_enter()\
/calomel::*baravelli_calomel()\
/password::*baravelli_password()\
/officer::Baravelli: Ha! Ha! He stops by here on occasion. Loyal customer, that guy.\
/gatsby::Baravelli: Gatsby?  Gatsby?!  Where?  Aww, you foolin'.  He's not coming by for another week!\
/drunkard::Baravelli: I'm not, uh, supposed to acknowledge him.\
/tom::Baravelli: I've seen that guy before.\
/george::Baravelli: That clown?  He has the shop up the street!\
/myrtle::Baravelli: Oh, I've seen her too.  If you know what I mean.", "fight::*die('Before you can get close enough to Baravelli, he snaps his fingers, and three of the patrons pull out Tommy guns and shoot you to death.  A lot.')", "", "");
function baravelli_mary() { say("Baravelli: That's no fish!"); }
function baravelli_sturgeon() { say("Baravelli: Aw, you a craze.  A sturgeon, he's a doctor cuts you open when-a you sick."); }
function baravelli_haddock() { say("Baravelli: 'At's a-funny, I got a haddock too.  I take an aspirin for it."); }
function baravelli_calomel() { say("Baravelli: You mean a chocolate calomel? I like-a that too."); }
function baravelli_password() { say("Baravelli: Password?  You think the password is password?  Heh, this a-speakeasy is not that easy!  Oh wait, I mean completely reputable estbalishment."); }
function baravelli_speakeasy_enter() {
	if (gs("speakeasypw") == 1) {
		say("Baravelli: Oh, you know the password!  Welcome to our speakeasy; Baravelli at your service!  Here, have some wine on the house!  Make yourself at home!\nBaravelli hands you a bottle of wine.");
		give_hero(wine);
		sgs("speakeasypw",2);
	}
	else if (gs("speakeasypw") == 2) { say("Baravelli: Hope you enjoy your time at Baravelli's!"); }
	else {
		say("Baravelli: Swordfish?  That's a... a lucky guess.  You-a clearly cheating.  I'm not going to let you have in yet unless you know the password ...for real."); //You might know the password from a previous game, from reading this source code here, or from a legitimately lucky guess, but you have to get it through official means.  No sidestepping.
	}
}


// CATHERINE
ch("Catherine", true, nowhere, "Catherine is a slender, worldly girl of about thirty with a solid sticky bob of red hair and a complexion powdered milky white. Her eyebrows had been plucked and then drawn on again at a more rakish angle but the efforts of nature toward the restoration of the old alignment gave a blurred air to her face.", "*talk_catherine()", "", "", "");
function talk_catherine() {
	if (gs("catherine") == 0) {
		say("Catherine asks you: Do you live down on Long Island, too?\nYou tell her you live on West Egg.\nCatherine: Really? I was down there at a party about a month ago. At a man named Gatsby's. Do you know him?\nYou tell her that you live next door.\nCatherine: Well, they say he's a nephew or a cousin of Kaiser Wilhelm's. That's where all his money comes from.\nYou look surprised.  She nods and looks eager to talk some more.");
		sgs("catherine",1);
	}
	else if (gs("catherine") == 1) {
		say("Catherine leans close to you and changes the subject by whispering in your ear: Neither of them can stand the person they're married to.\nCatherine points to Myrtle and Tom.\nCatherine: Can't STAND them. What I say is, why go on living with them if they can't stand them? If I was them I'd get a divorce and get married to each other right away.\nMyrtle overhears and cusses at you.\nCatherine whispers: You see? It's really his wife Daisy that's keeping them apart. She's a Catholic and they don't believe in divorce.\nYou note to yourself that Daisy was not Catholic and you're a little shocked at the elaborateness of the lie.");
		sgs("catherine",2);
	}
	else if (gs("catherine") == 2) {
		say("Before you get a chance to talk further, Catherine interjects to ask Myrtle why she married Mr. Wilson.\nMyrtle: I married him because I thought he was a gentleman.  I thought he knew something about breeding, but he wasn't fit to lick my shoe.\nCatherine: You were crazy about him for a while.\nMyrtle: Crazy about him! Who said I was crazy about him? I never was any more crazy about him than I was about that man there.\nMyrtle points directly at you.\nYou to show by your expression that you had played no part in her past.\nYou think it's about time you had some wine.  You remember the bottle being put down in the dining room.");
		sgs("catherine",3);
	}
	else if (gs("catherine") == 3) {
		says = new Array("Catherine leans in and asks you some questions about restaurants in West Egg.  She pretends to know the area, but doesn't seem to realize that it's purely residential, and there are no restaurants.  You make up something and look away.", "Catherine looks toward Myrtle and makes a comment about her diet, or lack thereof.  Notably, Catherine is fatter than Myrtle.  But you're not judging, just observing some hypocrisy...", "Catherine continues to talk inanely about fashion trends.", "Catherine mentions something about the economy, but she doesn't seem to know much about economics at all.", "Catherine tells you about some book she read recently.  You try to change the subject, but she ignores you and keeps talking about her book.");
		say(says[Math.floor(Math.random()*says.length)] + " It doesn't look like Catherine has any more useful things to say.  Though, perhaps she never had anything interesting to say in the first place...");
	}
	else if (gs("catherine") == 4) {
		say("Catherine: Hi, Nick!  I've never seen you at one of these parties?  First time here?  Gatsby must be taking a liking to you.  It takes a true socialite to get into one of these parties.  Gatsby was a graduate of Oxford, y'know, so he's selective with his company.\n\nYou note privately to yourself that the amount of guests at this party -- especially the uninvited ones -- doesn't show too much hint of selectivity.");
	}
}


// Gatsby's butler
ch("butler", false, nowhere, "An elegant and well-dressed man in a tailcoat.  He appears to be one of Gatsby's butlers.", "*talk_butler()", "", "", "", "The butler coughs and looks at you earnestly.  Maybe you should talk to him?");
function talk_butler() {
	if (gs("butler") == 0) {
		say("Butler: Sir?  You're Nick Carraway, sir?\nYou say you are.\nButler: Master Gatsby wanted you to have this.\nHe hands you some small and ornate sheet of paper and then walks away.  It looks to be an invitation.  You store it in your pocket.");
		give_hero(invitation);
		sgs("butler", 1);
		set_personloc(butler, nowhere);
	}
}


// LUCILE
ch("Lucille", true, gtsbylemons, "description", "Lucille: Hi, I'm Lucille.  Nice night, right?  And you are?\nYou introduce yourself.\nLucille: Oh, I've heard of you.  I'm a friend of Jordan's.  She's here at this party too -- always trying to find more about this Gatsby fellow.  Personally, I think Gatsby is a bit shady.  I've heard he was a German spy during the War.", "", "", "", "");


// SARAH
ch("Sarah", true, gtsbygarage, "description", "Sarah: Nice car, huh?  Gatsby sure does have a flair for the dramatic.  But just between you and me, I think Gatsby uses this car for more than just show.  I've heard that he's a huge bootlegger.  I've even heard he once killed a guy in cold blood!", "", "", "", "");


// stranger (later turns out to be Gatsby)
ch("stranger", false, gtsbydeck, "description", "Stranger: Look at all these people, just going about their night, having a good time.  Sure gives you some interesting perspective, being up here, doesn't it?", "", "", "", "");