// Places you can be

var Place = new Object;
NUM_PLCS = 0;
function pl(name, fullname, description, append, sights, special, exits, hExits)
{
	Place[++NUM_PLCS] = new Object;
	Place[NUM_PLCS].id = NUM_PLCS;
	Place[NUM_PLCS].name = name; //script name
	Place[NUM_PLCS].fullname = fullname; // game name
	Place[NUM_PLCS].description = description;
	Place[NUM_PLCS].append = append; // Allows a function to take place as soon as you enter the room, such as recieving something.
	Place[NUM_PLCS].sights = sights; // Objects that can be seen in the room, and their descriptions when you look at them.
	Place[NUM_PLCS].special = special; // Special room-specific commands that can be done.
	Place[NUM_PLCS].exits = exits; // Exits in the room.
	Place[NUM_PLCS].hExits = hExits ? hExits : ""; // Allows for exits to coorespond to other exits, such as in to be "north".
	eval(name + ' = Place[' + NUM_PLCS + '];');
}


// WEST EGG
//pl("game name", "stated name", "description", "function appendix to description", "things that can be examined", "commands unique to location", "exits", "remap the exits");
pl("nowhere", "Nowhere", "Nowhere is the digital wasteland where characters and items are stored while not involved in the plot.  You shouldn't be here.  In fact, if you are here, something has gone horribly wrong with the game.", "", "", "", "", "");

pl("outsidechrhouse", "Outside Your House", "You are on a road, right outside your lovely house in pristine West Egg, a part of Long Island, in New York. [[ outsidechrhouse_append() ]]", "",
"house::It would be a very lovely and luxurious house anywhere else, but in West Egg, it's simply modest, even an eyesore.  I mean, there are mansions everywhere and all that.\
/road::Rocky and bumpy, but cars can actually drive on it.  Hey, it's the 1920s.\
/door::[[ in_inv(key) == false ? 'it's firmly locked with a key you seem to not have.  Perhaps you should stop dropping things.' : 'The door to your house is unlocked.']]\
/window::The nearest one is way up there, on the second story of your modest house.",
"in::*need_house_key()\
/open::*need_house_key()\
/close::*close_house_key()\
/break::*break_near_house()\
/window::That would be wonderful, if there were any windows that you could reach.",
"west::road.east::crossroads.in::nowhere", "");
function outsidechrhouse_append() {
	sgs("in_home", 0);
	if (gs("say_note") == 0) {
		sgs("say_note",1);
		return(" You fumble a little bit, and you realize that you just dropped something onto the grass. (Type HELP and click ENTER if you don't know how this kind of game works.  Type CREDITS for credits.)\n");
	}
	else { return(""); }
}
function need_house_key() {
	if(Token[1] == "in" || Token[2] == "door") {
		if (gs("attempted_open") == 1 && !in_inv(key)) { say("Your door is still firmly locked, no matter how many times you try to open it.  Try looking for your key."); }
		else if (!in_inv(key)) {
			say("You try to get in your house, only to find that the door is locked.  You fumble around for your key, but you can't find it.  I guess your non-textually supported habit of dropping things seems to be taking a toll on you.  You seem to have dropped your house key somewhere.  You remember something about a pond.  Explore around the map.");
			sgs("attempted_open", 1);
		}
		else {
			say("You open the door and walk inside your house.\n\n");
			if (gs("key_inc_score") == 0) { inc_score(); }
			sgs("key_inc_score", 1);
			sgs("in_home", 1);
			set_heroloc(chrfoyer);
			sent_look = true;
			look();
		}
	}
	else if (Token[2] == "mailbox") { say("This isn't Zork.  Nice try."); }
	else if (Token[2] == "window") { say("You can't reach the window."); }
	else { say("It's probably best if you just leave things as they are."); }
}
function close_house_key() {
	if(Token[2] == "door") {
		if (!in_inv(key)) { say("The door is already closed and locked, much to your current problem."); }
		else { say("You close and lock the door."); }
	}
	else if (Token[2] == "window") { say("You can't reach the window."); }
	else { say("It's probably best if you just leave things as they are."); }
}
function break_near_house() {
	if (gs("key_inc_score") == 0) { say("Now, there should be better ways to get in your house than to resort to property distruction."); }
	else { say("Now let's not just go around breaking things."); }
}

var station_road_items = "house::It looks just like your house normally does, but smaller.\
/station::It could have trains in it!\
/train::You actually can\'t see one from here.\
/road::Rocky and bumpy, but cars can actually drive on it.  Hey, it's the 1920s.";
pl("road", "East Station Road", "You are walking down the road.  You can still see your house from here, but you've walked away from the door.  Further away, you can see a train station.", "", station_road_items, "", "west::road2.east::outsidechrhouse", "");

pl("road2", "West Station Road", "You continue walking down the road.  Your house is all but vanished, but you can see the train station clearly ahead now.", "", station_road_items, "", "west::station.east::road", "");

pl("station", "The Train Station", "You are at the train station.  [[ gs('train_here') == 0 ? 'The trains must be somewhere else, however, because they certainly are not here.  Instead, the best you can see is a signpost.' : 'Luckily, a commuter train is here waiting for you, complete with conductor!' ]]", "",
"/house::You can\'t even see it from here, but if you could, it would still be modest.\
/train::[[ gs('train_here') == 0 ? 'Sadly, you cannot see one yet.' : 'it's here in all its commuter glory.  Choo! Choo!' ]]\
/sign::It mocks you, saying \"Please wait patiently for the next commuter train to arrive.  The next stop is Valley of Ashes, en route to New York City.\"  If you think about it just right, it becomes existential and metaphorical too.\
/road::Rocky and bumpy, but cars can actually drive on it.  Hey, it's the 1920s.",
"wait::*wait_train()", "east::road2", "");
function wait_train() {
	if (gs("gatsby_first") == 0) {
		say("You wait a while for the train to arrive.  Then you realize that today is Sunday, and there's no train service today.");
	}
	else if (gs("train_here") == 0) {
		set_personloc(conductor,station);
		sgs("train_here", 1);
		say("You wait patiently until the train arrives.\n\n");
		sent_look = true;
		look();
	}
	else {
		set_personloc(conductor,nowhere);
		sgs("train_here", 0);
		say("You wait some more, watching the train move from the station, with it's smokestack puffing away into the distance.\n\n");
		sent_look = true;
		look();
	}
}

pl("crossroads", "The Crossroads", "You are at a cross in the road, affectionately referred to as \"The Crossroads\".  A signpost tells you where everything is.", "",
"sign::It says \"West to the commuter train, North to the beach, East to Gatsby\'s Mansion, South to the pond.\"\
/road::Rocky and bumpy, but cars can actually drive on it.  Hey, it's the 1920s.",
"", "west::outsidechrhouse.north::beach_road.east::gtsbyroad.south::south_road", "");

pl("gtsbyroad", "Gatsby Road", "The road is named after Gatsby because it goes to his luxurious mansion, perhaps the biggest house in all of West Egg.  You can see his mansion looming in the distance.", "", "house::It's large, but you can't quite make out it's features.\/road::Rocky and bumpy, but cars can actually drive on it.  Hey, it's the 1920s.", "", "west::crossroads.east::outsidegtsbymansion", "");

pl("outsidegtsbymansion", "Outside Gatsby's Mansion", "You see Gatsby's mansion... or, rather, because you don't know Gatsby very well, you know it's a mansion that belongs to a gentlemen of the name Gatsby. It's a colossal affair by any standard... in fact, it's an imitation of some Hotel de Ville in Normandy.  It has a tower on one side, lots of ivy, and you can even make out a marble swimming pool and more than forty acres of lawn and garden.  [[ gs('gtsbygate_open') == 0 ? 'The whole house is closed off by a wall and a massive gate, locked shut.' : 'You see a closed off wall, but the massive gate is open, and you could walk inside, as many people are doing.' ]]", "",
"gate::It's lovely and ornate, and hard to move.",
"in::*gtsbygate()\
/open::*open_gtsbygate()\
/close::*close_gtsbygate()", "west::gtsbyroad.in::nowhere", "");
function open_gtsbygate() {
	if (gs("gtsbygate_open") == 0) { say("It's locked shut and won't budge."); }
	else { say("It's already open."); }
}
function close_gtsbygate() {
	if (gs("gtsbygate_open") == 0) { say("It's already closed."); }
	else { say("It won't budge."); }
}
function gtsbygate() {
	if (gs("gtsbygate_open") == 0) { say("You walk right up to an ornate gate, only to realize it's still closed and you have no hope of going in the mansion.  Yet."); }
	else {
		set_heroloc(gtsbymansion);
		sent_look = true;
		look();
	}
}

pl("south_road", "North New Road", "This road, aptly named New Road, looks very new.  You can see pretty trees lining the road.  You know that Jordan's House and a pond are both in this direction.  [[ in_inv(key) == false ? ' You also recall that you left your key somewhere by that pond.' : '' ]]", "", "tree::It has many branches, leaves, and even a bird in it.  Looks to be a bluejay./\road::Rocky and bumpy, but cars can actually drive on it.  Hey, it's the 1920s./\pond::You can't see the pond yet, it's further down./\house::You can see a few houses from here, but they're all farther away.", "", "north::crossroads.south::south_road2", "");

pl("south_road2", "South New Road", "After going a bit more south, you pretty much see more of the same -- nice trees and nice houses.", "", "tree::It has many branches, leaves, and even a bird in it.  Looks to be a bluejay./\road::Rocky and bumpy, but cars can actually drive on it.  Hey, it's the 1920s./\pond::You can't see the pond yet, it's further down./\house::You can see a few houses from here, but they're all farther away.", "", "north::south_road.west::pond.east::outsidejrdhouse", "");

pl("pond", "The Duck Pond", "You're at the pond where you usually relax.  You can see ducks swimming around in the pond.", "", "pond::It looks wet.  Ducks are swimming around in it./\duck::Ducks: Quack! Quack!", "give.duck::*feed_duck()/\give.bread::*feed_duck()", "east::south_road2", "");
function feed_duck() {
	if (in_inv(bread)) { say("Ducks: Quack! Quack! Quack! Quack!\nYou feed the ducks for a bit, keeping most of your bread left.  You hope Gatsby will show up, but he hasn't yet.  You recall that he usually comes down to the pond on Tuesdays."); }
	else { say("You check your pockets and realize you have nothing to feed the ducks with.  Oh well."); }
}

pl("outsidejrdhouse", "Outside Jordan's House", "Jordan's house isn't that large; in fact, it's smaller than yours.  But it still looks homey.  You can tell she doesn't spend much time in it.", "", "house::It's white and incredibly clean, and has one window at the top./\window::It's high up and the lights are off./\door::It's firmly locked.", "open.door::It's firmly locked./\break::It's best you not destroy the property of people you barely know.", "west::south_road2", "");

var beachsights = "beach::it's a mostly rocky beach, with very little sand.\
/water::It separates the new-money West Egg from the old-money East Egg, almost metaphorically.\
/egg::Yes, these two areas of New York are actually referred to as eggs.\
/road::Rocky and bumpy, but cars can actually drive on it.  Hey, it's the 1920s.";
pl("beach_road", "Beach Road", "You are on the road toward the beach, which touches the body of water that separates West and East Egg.  You see a few people playing happily on the beach in the far distance.  If only you could be one of them...  Well, anyways.", "", beachsights, "", "south::crossroads.north::beach_road2", "");

var beachsightsadd = beachsights + "\/light::You can\'t really make it out from here.  All you can tell is that it's green.  Symbolic?";
pl("beach_road2", "Beach Road", "As you travel further, the beach, and incidentally, East Egg, get closer.  If you look at just the right angle, you can almost see a green light coming from the other side of the shore.", "", beachsightsadd, "", "south::beach_road.north::beach", "");

pl("beach", "West Egg Landing", "They call it a beach, but, in reality, it's more of a rocky shore.  There are a few other people just sitting here, but none of them seem very interested in talking to you.  There is also a sailor who is paid to take people to and from each Egg.  Simply talk to him to travel.", "", beachsightsadd, "sail::*talk_to(sailor)", "south::beach_road2.west::beach_west.east::beach_east", "");

pl("beach_east", "Beach", "This beach... er rocky shore... really goes a long way, as far as you can see.  There is nothing of interest further down the beach.  For all you know, it could go on forever.", "", beachsightsadd, "west::*beach_walk_back()", "west::nowhere.east::beach_east", "");

pl("beach_west", "Beach", "This beach... er rocky shore... really goes a long way, as far as you can see.  There is nothing of interest further down the beach.  For all you know, it could go on forever.", "", beachsightsadd, "east::*beach_walk_back()", "west::beach_west.east::nowhere", "");
function beach_walk_back() {
	say("You walk all the way back the way you went, arriving back at the West Egg Landing by the sailor.\n\n");
	set_heroloc(beach);
	sent_look = true;
	look();
}


// EAST EGG
pl("east_egg", "East Egg Landing", "Welcome to East Egg, the land of the old money and mysterious riches.  Speaking of riches, a sailor has been hired to take anyone from Egg to Egg.  Simply talk to him to do so.", "", beachsights, "sail::*talk_to(sailor)", "north::buchanan_road", "");

var beachsightsroad = beachsights + "/\house::It's large and brown, towering over you, but not nearly as much as some of the other mansions you've seen.";
pl("buchanan_road", "Buchanan Road", "On your way up, you catch a glimpse of the Buchanan Residence, a house much nicer than yours, but still not the nicest house around.", "", beachsightsroad, "", "south::east_egg.north::outsidebuchhouse", "");

pl("outsidebuchhouse", "Outside the Buchanan Residence", "You're outside the Buchanan Residence, a house much nicer than yours.  It has a nice view of the beach.", "", beachsightsroad, "in::*tom_block()", "south::buchanan_road.in::nowhere", "");
function tom_block() {
	if (gs("tom_booked") == 0) { say("Tom stops you in your tracks, saying: \"Woah, not without my book, no you're not.  Give me my book before you come to my house.\""); }
	else if (gs("buchhouse_locked") == 1) { say("You try the door to their house, but find it sadly locked shut."); }
	else {
		set_heroloc(buchfoyer);
		sent_look = true;
		look();
	}
}


// NICK'S HOUSE
pl("chrfoyer", "Your Foyer", "Your house is pretty modest, especially by West Egg standards, but that doesn't mean you haven't put some thought into your foyer.  There's a pretty good view out the window.", "","/window::You can see a view all the way down to the rocky beach, and over to East Egg.", "/open.door::*need_house_key()\/open.house::*need_house_key()\/close.door::*close_house_key()", "west::chrliving.south::chrlibrary.out::outsidechrhouse.up::chrbedroom", "");

pl("chrliving", "Your Living Room", "Your living room is lovely, though not actually lived in much.  You prefer the active and single life, and don't do much inviting yourself.  However, you still have tables, chairs, and pictures on the wall like the rest of them.  Gotta keep up with those people in the West Egg.", "",
"table::It's brown, long, and you can eat food on it.\
/food::You don't actually have any food on the table.\
/chair::It's good for sitting.\
/picture::It's of Missouri, where you used to live.\
/wall::It's got a small crack in it.", "", "east::chrfoyer.south::chrkitchen", "");


pl("chrkitchen", "Your Kitchen", "Your kitchen has served you well for the few meals you have here, mostly to yourself.  There's an oven and a cupboard.", "",
"cupboard::It's an attractive cubpoard of the typical style of your house.  You usually keep bread in it.\
/oven::It's a large oven.  You can bake stuff in it.",
"open.cupboard::*open_cupboard()\
/open.oven::There is nothing in the oven.\
/cook::You're not really in the mood to cook.  Besides, you have no ingredients.", "east::chrlibrary.north::chrliving", "");
function open_cupboard() {
	if(gs('cpbd')==1) { say("The cupboards are empty."); }
	else {
		set_thingloc(bread,chrkitchen);
		sgs("cpbd", 1);
		say("You open the cupboards, but only find a small bit of bread.  It falls to the floor.  Come to think of it, you haven't been shopping in a while.");
	}
}

pl("chrlibrary", "Your Library", "You have a nice library with many books to keep you busy.  You also have a nice lounge chair to read on.", "", "chair::It's green, large, and comfy.  Good for one person: you.", "", "west::chrkitchen.north::chrfoyer", "");

pl("chrbedroom", "Your Bedroom", "This is, oddly enough, where you spend the most time in your house.  Your bed is here.", "", "bed::Good for lots of quality sleeping.", "", "west::chrcloset.south::chrbathroom.down::chrfoyer", "");

pl("chrcloset", "Your Closet", "You actually have a pretty luxurious walk-in closet.", "", "", "", "east::chrbedroom", "");

pl("chrbathroom", "Your Bathroom", "You have a pretty nice bathroom, complete with a toilet, shower, and faucet.", "",
"toilet::It's pretty functional for bathroom-related things.  You don't really have those kinds of needs right now, though.\
/shower::It's a pretty nice shower for, like, showering and stuff.\
/sink::Portable water is like one of the most amazing inventions ever.  Water, right to your house!",
"drink::You're not very thirsty.\
/bathe::You take another shower and get out all squeaky clean.", "north::chrbedroom", "");


// BUCHANAN'S HOUSE
pl("buchfoyer", "Buchanan's Foyer", "You enter the Buchanan residence and see their lovely foyer.  You see a sitting room to the east and a dining room to the west, plus a staircase going upstairs.  You decide it best not to intrude on their affairs and leave the staircase alone.  You can hear talking coming from the sitting room.",
"", "/staircase::It looks fairly ornate, witih a smooth, wooden railing.", "up::*buchoff_limits()/\out::*leaving_so_soon()", "east::buchsitting.west::buchdining.up::nowhere.out::nowhere", "");
function buchoff_limits() { say("Changing your mind and intruding on the Buchanan's private affairs after all, you bolt up the stairs.  Daisy comes out and yells at you and tells you you're a bad guest, and you come back down."); }
function leaving_so_soon() {
	if (gs("tom_ticket") == 0) { say("You hear Tom cry out: \"Hey, why are you leaving so soon?  Can't you stay a little while longer?\"  You decide that you shouldn't leave so quickly."); }
	else {
		set_heroloc(outsidebuchhouse);
		sent_look = true;
		look();
	}
}

pl("buchsitting", "Buchanan's Sitting Room", "You're in a well-lit room with lots of natural light and a large sofa.  You can tell it's beginning to get dark.", " [[phone_append_sitting()]]", "window::A fair amount of light comes through the window, and can even see the sailor pacing back and forth.  You can tell it's beginning to get dark, though.\
/seat::A nice and large green sofa, with plenty of room to sit.\
/phone::[[ gs('phone_answered') == 0 ? It's ringing.  Loudly. : It's nicely quiet.", "", "west::buchfoyer.north::buchoffice", "");
function phone_append_sitting() {
	if (gs("phone_answered") == 0) { say("\nYou can hear a phone ringing from the office to the north."); }
}

pl("buchdining", "Buchanan's Dining Room", "You walk into a rather empty dining room, with a table set for dinner.", "", "table::It's large and oak, with plates and silverware set for dinner.\
/plate::There's no food on it, sadly.\
/silverware::Looks ready to go for dinner!", "", "east::buchfoyer", "");

pl("buchoffice", "Tom's Office", "You walk into Tom's office, and see a very cluttered desk.", "[[ phone_append_office()]]",
"phone::It's ringing.  Loudly.\
/desk::It's cluttered with papers.  Everywhere.\
/paper::Most of them seem to be expense reports.  They don't seem to be of any particular importance.", "take.phone::*answer_phone_office()/\answer::*answer_phone_office()", "south::buchsitting", "");
function phone_append_office() {
	if (gs("phone_answered") == 0) { say("\nYou also see a phone that keeps ringing."); }
}
function answer_phone_office() {
	if (gs("phone_answered") == 0) {
		say("Before you can pick it up, Tom runs up and answers it.");
		set_personloc(tom,buchoffice);
		sgs("phone_answered",1);
		inc_score();
	}
	else { say("Tom is already on the phone and is having a very hushed conversation."); }
}


// VALLEY OF ASHES
pl("asheslanding", "Valley of Ashes Station", "Lying about half way between West and Egg and New York lies a forgotten desolate area of land referred to as The Valley of Ashes, a farm where ashes grow like wheat.  Occasionally a line of grey cars will crawl, looking like ghosts covered in ash.  You also see the train station here.", "",
"/ash::There's a lot of ash here.  The place is basically covered in it.\
/valley::It's a valley bounded by hills, and all covered in ashes.\
/road::it's covered in ash, like the rest of everything around here.\
/train::[[ gs('train_here_ashes') == 0 ? 'Looks like one won\'t be here for quite some time. : 'it's here, ready to go!  Choo! Choo!]]\
/sign::It reads \"Valley of Ashes: Trains Every Five Hours\"",
"wait::*wait_train_ashes()", "west::outsidewils", "");
function wait_train_ashes() { say("You wait a while, but you just get more covered in ash.  The train won't come for many more hours."); }

pl("outsidewils", "Outside Mr. Wilson's Shop", "You find yourself outside a car repair shop, also covered in ash.  It looks a little run down.", "[[ tom_talks_about_wilson() ]]",
"/store::Repairs. GEORGE B. WILSON. Cars Bought and Sold\
/ash::There's a lot of ash here.  The place is basically covered in it.\
/valley::It's a valley bounded by hills, and all covered in ashes.\
/road::it's covered in ash, like the rest of everything around here.", "", "north::street10.east::asheslanding.south::eyes.in::wilsshop", "");
function tom_talks_about_wilson() {
	if (gs("myrtle_enter") == 2 && gs("tom_talks_about_wilson") == 0) {
		say("\nTom: It does her good to get away.\nYou ask if Mr. Wilson objects.\nTom: Wilson?  He's so dumb he doesn't know he's alive.");
		sgs("tom_talks_about_wilson",1);
	}
}

pl("wilsshop", "Mr. Wilson's Shop", "[[ wilsshop_desc() ]]", "[[ wilsshop_myrtle() ]]", "", "", "north::wilsgarage.out::outsidewils.south::mrswilsroom.west::wilsroom", "");
function wilsshop_desc() {
	if (gs("wilson_tom_convo") == 0) {
		say("You enter the shop, and Tom immediately slaps Mr. Wilson on the shoulder jovially.\nTom: Hello, Wilson, old man.  How's business?\nGeorge: I can't complain.  When are you going to sell me that car?\nTom: Next week; I've got my man working on it now.\nGeorge: Works pretty slow, don't he?\nTom: No, he doesn't.  And if you feel that way about it, maybe I'd better sell it somewhere else after all.\nGeorge: I don't mean that.... I just meant...\n\nTom whispers to you: Come, Myrtle is in her room to the South.");
		sgs("wilson_tom_convo",1);
	}
	else { say("The interior of the shop is unprosperous and bare.  It occurs to you that this shadow of a shop must conceal sumptuous and romantic apartments above."); }
}
function wilsshop_myrtle() {
	if (gs("myrtle_enter") == 1) {
		say("\nYou walk back in to the shop and see Mr. and Mrs. Wilson.  Mrs. Wilson shakes hands with Tom, wets her lips, and turns to Mr. Wilson.\nMyrtle: Get some chairs, why don't you, so somebody can sit down.\nTom whispers to Myrtle: I want to see you.  Meet me at the apartment.\nMyrtle calls out to George: George, nevermind about those chairs, I'm going out to see my sister.\nGeorge calls back: Ok, see you soon!\nTom turns to you and whispers: Ok, I'll follow you to my car and we can go meet up with Myrtle at my secret apartment.");
		set_personloc(george,wilsgarage);
		sgs("myrtle_enter",2);
	}
} 

pl("wilsgarage", "Mr. Wilson's Garage", "Wilson's garage looks pretty dusty, and there's a car on bricks here.  The garage smells kind of funny.", "", 
"dust::Doesn't smell so great.\
/car::It looks very modest and in definite need of fixing.\
/brick::The bricks are hard and red.", "", "south::wilsshop", "");

pl("wilsroom", "George Wilson's Room", "Mr. Wilson's room looks not that bad for the general run-down quality of his shop.  He has a bed in a corner with a nightstand by it.",
"", "bed::A standard four poster bed, unmade.\/nightstand::It's by the bed, but doesn't really have anything on it.\
/nightstand::You rummage through the nightstand, but don't find anything other than a sinking feeling that you shouldn't be invading other people's privacy.",
"make.bed::Why would you want to go around making other people\'s beds?  Weirdo.", "east::wilsshop", "");

pl("mrswilsroom", "Myrtle Wilson's Room", "[[ myrtle_enter() ]]", "",
"road::Looking out the window, you can see it's covered in ash, like the rest of everything around here.\
/window::You look out the window and see a road, covered in ash.\
/ash::There's a lot of ash here.  The place is basically covered in it.\
/drape::They can cover the window.  They're red and silky.\
/bed::A standard four poster bed, nicely made.", "", "north::wilsshop", "");
function myrtle_enter() {
	if (gs("myrtle_enter") == 0) {
		say(" You look into Mrs. Wilson's room, and see Mrs. Wilson herself.  You see her get up, smile slowly, and walk out the door to the north, passing by her husband in the store as if he were a ghost.");
		sgs("myrtle_enter",1);
	}
	else { say("Mrs. Wilson's room doesn't really have too much of interest.  She has a bed in the middle, and some drapes above it, with a window looking outward at the road outside."); }
}

pl("eyes", "Under Billboard", "Above you are the eyes of Doctor T.J. Eckleburg, or at least that's what the billboard says.", "[[ tom_talks_about_ashes() ]]",
"sign::The eyes of Doctor T. J. Eckleburg are blue and gigantic--their retinas are one yard high. They look out of no face but, instead, from a pair of enormous yellow spectacles which pass over a nonexistent nose. Evidently some wild wag of an oculist set them there to fatten his practice in the borough of Queens, and then sank down himself into eternal blindness or forgot them and moved away. But his eyes, dimmed a little by many paintless days under sun and rain, brood on over the solemn dumping ground.\
/road::The road is covered in ash, like the rest of everything around here.\
/ash::There's a lot of ash here.  The place is basically covered in it.\
/valley::It's a valley bounded by hills, and all covered in ashes.", "", "north::outsidewils.south::street2", "");
function tom_talks_about_ashes() {
	if (gs("tom_talks_about_ashes") == 0) {
		say("\nTom: Terrible place, isn't it?\nTom exchanges a frown with Doctor Eckleburg on the billboard.");
		sgs("tom_talks_about_ashes",1);
	}
}

pl("street2", "South City Street", "You're on an open street.  You can see Wilson's shop to the north and a General store to the south.", "",
"road::The road is covered in ash, like the rest of everything around here.\
/ash::There's a lot of ash here.  The place is basically covered in it.\
/valley::It's a valley bounded by hills, and all covered in ashes.\
/store::Looks like quite a lot of purchasing happens there.", "", "north::eyes.south::street3.west::alley", "");

pl("street3", "Outside the General Store", "You're on a street, standing right outside a General Store.", "",
"road::The road is covered in ash, like the rest of everything around here.\
/ash::There's a lot of ash here.  The place is basically covered in it.\
/valley::It's a valley bounded by hills, and all covered in ashes.\
/store::The sign says: General Store: Things Bought and Sold.\
/sign::The sign says: General Store: Things Bought and Sold.", "", "north::street2.south::street4.in::generalstore", "");

pl("street4", "Outside Baravelli's", "You're on a street, outside Baravelli's.", "",
"road::The road is covered in ash, like the rest of everything around here.\
/ash::There's a lot of ash here.  The place is basically covered in it.\
/valley::It's a valley bounded by hills, and all covered in ashes.\
/baravelli::It looks like a restaurant.  You can see a couple patrons through the window.\
/store::It looks like a restaurant.  You can see a couple patrons through the window.\
/people::They look like they're having a good time.\
/window::You can see a couple patrons through the window.", "", "north::street3.in::baravellis.south::street9", "");

pl("street9", "Outside the Police Station", "You're on a street, outside a police station.", "",
"road::The road is covered in ash, like the rest of everything around here.\
/ash::There's a lot of ash here.  The place is basically covered in it.\
/valley::It's a valley bounded by hills, and all covered in ashes.\
/station::It's a police station, trying to bring law and order to the Valley.", "south::*tom_street_stop()", "north::street4.in::ashpolice.south::nowhere", "");

pl("alley", "East Alley", "You're in a tiny back alley, between the police station and Baravelli's.", "",
"road::The road is covered in ash, like the rest of everything around here.\
/ash::There's a lot of ash here.  The place is basically covered in it.\
/valley::It's a valley bounded by hills, and all covered in ashes.\
/station::It's a police station, trying to bring law and order to the Valley.\
/baravelli::From behind, it doesn't look like too much.", "", "east::street2.west::alley2", "");

pl("alley2", "West Alley", "You're further in the alley, surrounded by fences and a bunch of garbage. [[ seendrunk() ]]", "",
"road::The road is covered in ash, like the rest of everything around here.\
/ash::There's a lot of ash here.  The place is basically covered in it.\
/valley::It's a valley bounded by hills, and all covered in ashes.\
/fence::They're pretty high up and surround the alley, cutting it off from the rest of the road.\
/garbage::You look through the garbage.  It's just a bunch of very smelly stuff and you see nothing of interest.", "", "east::alley", "");
function seendrunk() { sgs('seendrunkard',1); }

pl("generalstore", "General Store", "You're in a general store.  You can see lots of wares around here.", "", "", "", "out::street3", "");

pl("baravellis", "Baravelli's", "You're in a restaurant, lit by candles.  You'd think it looks nice, except it looks clearly shady.  You can see some patrons having drinks.", "",
"road::Looking out the window, you can see it's covered in ash, like the rest of everything around here.\
/ash::There's a lot of ash here.  The place is basically covered in it.\
/valley::It's a valley bounded by hills, and all covered in ashes.\
/candle::A whole bunch of them are hanging from the ceiling.\
/people::There are a couple different patrons at different tables, all having drinks.\
/drink::You look a bit closer, and they look clearly alcoholic.",
"mary::*baravelli_mary()\
/sturgeon::*baravelli_sturgeon()\
/haddock::*baravelli_haddock()\
/swordfish::*baravelli_speakeasy_enter()\
/calomel::*baravelli_calomel()\
/password::*baravelli_password()\
/talk.mary::*baravelli_mary()\
/talk.sturgeon::*baravelli_sturgeon()\
/talk.haddock::*baravelli_haddock()\
/talk.swordfish::*baravelli_speakeasy_enter()\
/talk.calomel::*baravelli_calomel()\
/talk.password::*baravelli_password()\
/blow.candle::They're a little out of the reach of your breath.", "out::street4", "");

pl("ashpolice", "Valley Police Station", "You walk into a small police station.  An emblem on the wall reads \"Valley Police Station: Protect and Serve\". [[ personloc(drunkard) == ashpolice ? 'You also see the drunkard behind bars in the tiny cell.' : 'You can see a tiny cell, currently empty.' ]]", "",
"sign::It's shiny.\
/jail::It's a tiny cell that [[ personloc(drunkard) == ashpolice ? 'currently confines a drunkard.' : 'is currently empty.' ]]", "", "out::street9", "");

pl("street10", "North City Street", "You continue on a street, extending north.  The road seems to continue into the distant horizon.", "",
"road::The road is covered in ash, like the rest of everything around here.\
/ash::There's a lot of ash here.  The place is basically covered in it.\
/valley::It's a valley bounded by hills, and all covered in ashes.\
/horizon::It's far away.", "", "south::outsidewils.north::street11", "");

pl("street11", "North City Street", "You continue on a street, extending north.  The road seems to continue into the distant horizon.  You can see Tom's car not to far away.  There's also a curve in the road to the west.", "", "road::The road is covered in ash, like the rest of everything around here.\
/ash::There's a lot of ash here.  The place is basically covered in it.\
/valley::It's a valley bounded by hills, and all covered in ashes.\
/horizon::It's far away.\
/car::You can't make out that much of it.", "", "south::street10.north::tomscar.west::street12", "");

pl("street12", "West City Street", "This street seems slightly cleaner than normal.", "", "road::The road is covered in ash, but not as much.\
/ash::There doesn't seem to be as much ash here as usual...\
/valley::It's a valley bounded by hills, and all covered in ashes.  But not as much.", "", "east::street11.west::street13", "");

pl("street13", "West City Street", "This street seems slightly cleaner than normal, and now you can see why.  There's a park here!", "", "road::The road is covered in ash, but not as much.\
/ash::There doesn't seem to be as much ash here as usual...\
/valley::It's a valley bounded by hills, and all covered in ashes.  But not as much.\
/park::Looks empty, but clean.", "", "east::street11.south::park", "");

pl("tomscar", "Next to Tom's Car (Ashes)", "You walk over to the side of the road where you see a car that you presume belongs to Tom. [[ tom_talks_about_car() ]]", "",
"road::The road is covered in ash, like the rest of everything around here.\
/ash::There's a lot of ash here.  The place is basically covered in it.\
/valley::It's a valley bounded by hills, and all covered in ashes.\
/car::It's a nice car and quite clearly belongs to Tom.  He must keep it here to drive around New York with Myrtle.", "in::*ashes_drive()/\drive::*ashes_drive()", "north::street.south::street11.in::nowhere", "");
function tom_talks_about_car() {
	if (gs("tom_car_talk") == 0 && gs("myrtle_enter") == 0) { say("\nTom: Yep, this is my car.  Let's go get Myrtle first, though."); sgs("tom_car_talk",1); }
	else if (gs("tom_car_talk") != 2 && gs("myrtle_enter") == 1) { say("\nTom: Yep, this is my car.  Simply get in and let's drive off!"); sgs("tom_car_talk",2); } 
}
function ashes_drive() {
	if (personloc(tom) == heroloc()) {
		if (gs("myrtle_enter") == 0) { say("You motion to get into the car, but Tom stops you.\nTom: Hey, let's go get Myrtle first before driving off."); }
		else {
			say("\nYou get in the car and Tom drives you to The Apartments.\n\n");
			set_heroloc(tomscar2);
			sgs("ashes_side",1);
			if (gs("score_from_drive") == 0) { inc_score(); sgs("score_from_drive",1); }
			sent_look = true;
			look();
		}
	}
	else { say("Tom's car is locked, and he's not here to drive you anywhere."); }
}

pl("street", "North City Street", "You're on an open street.  You stare down the rest of the road and see that it goes on for miles with nothing of interest in sight.  Behind you is the rest of the Valley of Ashes.", "",
"road::The road is covered in ash, like the rest of everything around here.\
/ash::There's a lot of ash here.  The place is basically covered in it.\
/valley::It's a valley bounded by hills, and all covered in ashes.", "north::*tom_street_stop()", "south::tomscar.north::nowhere", "");
function tom_street_stop() { say("Tom: Hey, let's not wander too far.  We have important things to get to."); }

pl("park", "Park", "This park has a lovely fountain.  It's a bit rusty, but it looks like it was gold at some point.", "",
"fountain::It's bubbling out water.\
/water::Very wet stuff, this water is.", "fill::*fill_vase()", "north::street13", "");
function fill_vase() {
	if (Token[2] == "vase") {
		if (in_inv(vase)) {
			say("You quickly fill up the vase with some water.");
			sgs("vase_watered",1);
		}
		else { say("You don't have the vase."); }
	}
	else { say("You can't fill that up with water!"); }
}


// THE APARTMENTS
var aptlooks = "road::This road isn't covered with ash or anything.  It's probably the smoothest, cleanest, nicest road you've seen so far.\
/ash::No ash here, the Valley of Ashes is about twenty miles south.\
/car::It's a nice car and quite clearly belongs to Tom.  He must keep it here to drive around New York with Myrtle.\
/house::It's moderately nice and sits to your east.  You can see quite a few floors of nice apartment space through the windows, and a lobby at the bottom.\
/fence::It probably keeps out the undesirables.";

pl("tomscar2", "Next to Tom's Car (Apartments)", "You're still next to Tom's Car, but this time on the other side of things, having driven a while to The Apartments.  You see a moderately nice apartment building to the east and endless street to the north and south.  This apartment building seems to be the only sign of civilization for miles.  Very discreet.", "", aptlooks, "in::*apt_drive()/\drive::*apt_drive()", "north::street6.west::aptlobby.south::street5.in::nowhere", "");
function apt_drive() {
	if (personloc(tom) == heroloc()) {
		say("Tom: If you insist.\nYou get in the car and Tom drives you to back to The Ashes.\n\n");
		set_heroloc(tomscar);
		sgs("ashes_side",0);
		sent_look = true;
		look();
	}
	else { say("Tom's car is locked, and he's not here to drive you around."); }
}

pl("street5", "South Apartment Street", "You're on a street.  It seems to lead to nowhere.  Tom's car is behind you, and the apartment building is to your east, but blocked by a large fence.", "", aptlooks, "south::*tom_street_stop_b()", "north::tomscar2.south::nowhere", "");
function tom_street_stop_b() {
	if (personloc(tom) == heroloc()) { say("Tom: Hey, let's not wander too far.  We have important things to get to."); }
	else {
		say("You wander down the street for a while, but don't see anything of interest, get bored, and return back to Tom's car.");
		set_heroloc(tomscar);
		sent_look = true;
		look();
	}
}

pl("street6", "North Apartment Street", "You're on a street.  It seems to lead to nowhere.  Tom's car is behind you to the south, and the apartment building is to your east, but blocked by a large fence.", "", aptlooks, "north::*tom_street_stop_b()", "south::tomscar2.north::nowhere", "");

pl("aptlobby", "Apartment Lobby", "You stand in the lobby of The Apartments, which looks pretty much exactly as you expected.  Not exactly run down, of course, you wouldn't use that term.  But not the nicest place to be, either.  You suspect Tom could have afforded better.  You see an elevator to the north and a casino to the west.", "", "/elevator::It looks like something that could take you up and down.", "", "out::tomscar2.north::aptelevator.west::casino", "");

var elevdesc = "You're in an elevator.  There's an elevator boy here to take you up or down, as you desire, with his lever to control the elevator.  Technology these days is really stunning, and you now no longer need to walk up staircases.";
var elevlook = "lever::It looks like it moves the elevator up or down.";
var elevaction = "up::*elevator_up()/\down::*elevator_down()/\push.lever::Boy: Unhand that, that's my job!";
pl("aptelevator", "Elevator (Lobby Floor)", elevdesc, "", elevlook, elevaction, "south::aptlobby.up::nowhere.down::nowhere", "");
function elevator_up() {
	if (heroloc() == aptelevator) {
		if (gs("elevator_first") == 0) {
			say("Boy: What floor?\nTom: We're at the top.\nBoy: Ok.\n");
			sgs("elevator_first",1);
		}
		say("The elevator boy cranks the elevator switch up, and you go upward to the top.  You stop.\nBoy: We're here.\n\n");
		set_heroloc(aptelevator2);
		sent_look = true;
		look();
	}
	else if (heroloc() == aptelevator3) {
		say("The elevator boy cranks the elevator switch up, and you go upward to the top.  You stop.\nBoy: We're here.\n\n");
		set_heroloc(aptelevator);
		sent_look = true;
		look();
	}
	else { say("You're at the top floor.  The elevator cannot go higher."); }
}
function elevator_down() {
	if (heroloc() == aptelevator) {
		if (gs("elevator_fixed") == 0) { say("Boy: I can't take the elevator down to the basement until I fix it.  It's broken, and I need a wrench.  I'll also need clearence from the landlord.  Don't worry, though, it otherwise goes up and down just fine."); }
		else if (gs("elevator_authorized") == 0) { say("Boy: The elevator is fixed, but I still can't take you down until you get authorization from the landlord."); }
		else {
			say("Boy: Going down...\nThe elevator lurches down a bit.\nBoy: We're here.\n\n");
			set_heroloc(aptelevator3);
			sent_look = true;
			look();
		}
	}
	else if (gs("party_is_go") == 3) { talk_to(tom); }
	else if (heroloc() == aptelevator2) {
		say("The elevator boy cranks the elevator switch down, and you go down the lobby.\nBoy: We're here.\n\n");
		set_heroloc(aptelevator);
		sent_look = true;
		look();
	}
	else { say("You're at the bottom floor.  The elevator cannot go lower."); }
}

pl("casino", "Casino", "The casino has lots of flashing lights and many slot machines that bling and buzz at you.  You see a couple other people playing the slots here.  A nice fountain bubbles to the west.", "",
"people::They look kind of old, and clearly have some money to burn.\
/slots::They're very bright and attractive, and seem to tempt people to gamble as they're designed.\
/light::They flash and bling, distracting you for a bit.  You then regain your focus.", "gamble::*gamble()", "east::aptlobby", "");
function gamble() {
	if (in_inv(token) || in_inv(money)) {
		if (gs("gambled") == 0) {
			say("You gamble for a while, and eventually win big.  You decide to quit while you're ahead.  Some money spits out of the machine.");
			sgs("gambled",1);
			take_away(token);
			set_thingloc(money,casino);
		}
		else if (gs("gambled") == 1) {
			say("You decide it would be unwise to gamble further.  You don't want to risk losing all your money.");
			sgs("gambled",2);
		}
		else if (gs("gambled") == 2) {
			say("You gamble away all your remaining money. (Type UNDO to undo your action.)");
			take_away(money);
		}
	}
	else { say("You have no money to gamble with."); }
}

pl("aptelevator2", "Elevator (Top Floor)", elevdesc, "", elevlook, elevaction, "down::nowhere.south::outsidetomapt", "");

pl("outsidetomapt", "Outside Tom's Apartment", "You stand outside Tom's apartment.  The door is wide open.", "", "house::It's kind of cool to be right at the top.  But the view still isn't that great./\door::It's wide open.", "close.door::You close the door, but Myrtle re-opens it from the other side.", "north::aptelevator2.in::tomaptliving", "");

pl("tomaptliving", "Tom's Apartment Living Room", "You're in a living room, complete with a couch for socialization!  You can see a bedroom to the south and a dining room to the north.  A portrait hangs on the wall.", "picture::It's a portrait of a young Victorian woman smiling funny./\cseat::It looks a little old and tattered.  Doesn't seem particularly comfy./\bedroom::You don't want to know what goes on down there.", "", "south::*try_bedroom()", "out::outsidetomapt.north::tomaptdining.south::nowhere", "");
function try_bedroom() { say("Tom: Hey, stay out of our bedroom!  We deserve privacy!"); }

pl("tomaptdining", "Tom's Apartment Dining Room", "It's a nice dining room, though much smaller than the one in the Buchanan residence.  It's set up for a party.", "", "", "", "south::tomaptliving", "");

pl("aptelevator3", "Elevator (Basement)", elevdesc, "", elevlook, elevaction, "up::nowhere.south::aptstorage", "");

pl("aptstorage", "Storage Room", "It's a dark storage room that holds various things for the hotel.", "", "", "", "north::aptelevator3.in::aptfreezer", "");

pl("aptfreezer", "Freezer", "It's a walk-in freezer that keeps things cold.  It's very cold in here.", "", "", "", "out::aptstorage", "");


// GATSBY'S MANSION
pl("gtsbymansion", "Mansion Entrance", "You walk into Gatsby's mansion and notice the wide variety of guests.  Gatsby has certainly spared no expense at creating such a lavish event.", "", "things that can be examined", "", "out::outsidegtsbymansion.north::gtsbygardens.east::gtsbybeach", "");

pl("gtsbygardens", "The Garden Feast", "You walk into a garden.  Here, Gatsby has pitched a large tent.  Underneith the tent are several long tables, each filled with various plates of expensive food.  Not to mention the copious amounts of alcohol available at the bar, despite the Prohibition! Quite the feast!", "", "things that can be examined", "", "south::gtsbymansion.west::gtsbyorchestra.east::gtsbylemons.north::gtsbyblank1", "");

pl("gtsbybeach", "Gatsby's Beach", "Gatsby's mansion is right on the edge of the water between East and West Egg, and this affords him the opportunity to have a private beach.  You see many guests lounging about here.  In the distance, you can see Gatsby's two motor boats.", "", "things that can be examined", "", "west::gtsbymansion", "");

pl("gtsbylemons", "Orange and Lemon Crates", "You walk by a bunch of crates that are filled with oranges and lemons from a fruiterer in New York.", "", "things that can be examined", "", "west::gtsbygardens.north::gtsbyblank2", "");

pl("gtsbyorchestra", "Orchestra Under the Stars", "You hear music and walk in that direction.  Gatsby has a live orchestra playing on a patio near the mansion, billed as the \"Orchestra Under the Stars\".  You see guests looking up at the starry night sky while enjoying the hip new \"jazz\" genre being played.", "", "things that can be examined", "", "east::gtsbygardens.up::gtsbydeck.west::gtsbypool", "");

pl("gtsbydeck", "Gatsby's Deck", "You walk up the stairs to a deck that appears removed from the party.  Here, one can see all the guests at any of the various attractions, yet there is nothing to do on this deck.  Notably, despite the huge number of guests all around the mansion, only one guest appears to be on the deck.", "", "things that can be examined", "", "down::gtsbyorchestra", "");

pl("gtsbypool", "Gatsby's Pool", "As if having a private beach was not enough, Gatsby also has a lavish swimming pool.  You see guests milling about, drinking in the pool.", "", "things that can be examined", "", "east::gtsbyorchestra", "");

pl("gtsbyblank1", "Gatsby's Yard", "You continue to walk through Gatsby's yard.  The gardens are not too far and you can see people eating and talking in the distance.", "", "things that can be examined", "", "south::gtsbygardens.east::gtsbyblank2", "");

pl("gtsbyblank2", "Gatsby's Yard", "Gatsby has a pretty spacious backyard.  However, Gatsby has roped off a large portion of it to prevent guests from going all over.", "", "things that can be examined", "", "south::gtsbylemons.west::gtsbyblank1.east::gtsbyblank3", "");

pl("gtsbyblank3", "Gatsby's Yard", "You walk through more of Gatsby's spacious yard.  You can see the mansion nearby, with an open garage.", "", "things that can be examined", "", "west::gtsbyblank2.north::gtsbygarage", "");

pl("gtsbygarage", "Gatsby's Garage", "Gatsby's driveway ends in a large multi-car garage attached to his mansion.  You see guests crowded around one of Gatsby's cars.  After pushing by a few of them, you see that Gatsby is showing off his Rolls Royce.", "", "things that can be examined", "", "south::gtsbyblank3", "");
