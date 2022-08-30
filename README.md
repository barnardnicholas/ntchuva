# Ntchuva - An African Boardgame, programmed by Nick Barnard

[https://ntchuva.nickbarnard.co.uk/](https://ntchuva.nickbarnard.co.uk/)

## What is Ntchuva?

In the summer of 2022, a buddy of mine returned from a trip to Mozambique excitedly
talking about a hand-carved boardgame he'd picked up and offered to teach it to me.
The locals had called it 'Ntxuva'. I was immediately hooked by the simplicity of
the rules and the hidden complexity of the gameplay, and decided to program my own
version.

'Ntchuva' (the more common spelling, according to the internet) turns out to be
a simplified version of a game called 'Bao' which means 'Board' in
Swahili. Bao is played across East Africa and has attracted the attention of scholars,
experts and players across the world.

This simplified version is sometimes called 'Bao la Kujifunza', 'Bao for
Beginners' or 'Mbili-mbili'.

Bao is a member of a class of capture games called Mancala, one of the oldest
forms of board games. Although nobody knows exactly how old Mancala games are, possible
versions have been found in a 7th-century settlement in Ethiopia and a 2nd-3rd century
Roman bath house in Isreal. The game may even have been played in Ancient Egypt!

I hope you enjoy playing Ntchuva as much as I do, and I hope this simple version does some
justice to the game. Please check out the Roadmap for planned features!

## Further Reading

[https://mancala.fandom.com/wiki/Bao_la_Kujifunza](https://mancala.fandom.com/wiki/Bao_la_Kujifunza)

[https://en.wikipedia.org/wiki/Bao\_(game)](<https://en.wikipedia.org/wiki/Bao_(game)>)

[https://en.wikipedia.org/wiki/Mancala](https://en.wikipedia.org/wiki/Mancala)

# Rules

- The board is divided into 32 squares, or 'Pits'. Each player controls 16 Pits,
  in 2 rows of 8.

- Initially, each Pit contains 2 Seeds. The object of the game is to capture all of your
  opponent's Seeds. Do this, and you win!
- To move, select any Pit on your side of the board which contains at least 2 Seeds. If
  you don't have any squares with at least 2 Seeds, select any Pit which isn't
  empty.

- Remove all the Seeds from the selected Pit and 'sow' them, one at a time, into
  the subsequent Pits, in a clockwise direction.

- If the last Seed in your hand lands in a Pit which already contains Seeds, move again
  from that Pit. If your last Seed lands in an empty Pit, your turn is over.

- If your turn ends in a Pit in the front row (ie closest to your opponent's Pits),
  capture any Seeds of theirs which are in the same column (adjacent Pits in front row and
  back row) and discard them.

# Roadmap

Here are some planned features for Ntchuva:

- Online play - I'm planning to implement serverless PvP games based
  on auto-generated activation codes. It will probably use Google Firebase.

- omputer opponent - I'm making notes for how to add PvE play using
  a computer-controlled opponent. I have no idea how good or bad the computer player will
  be, but it will be fun to try and make it happen.

- Mobile app - This web game was created in React, but I also make React
  Native apps, so this is a definite possibility for the future.

- Better Seed animations - The current implementation uses React Spring
  as a quick-and-dirty way to make the Seeds look like they're rolling around in a
  bowl-shaped Pit. I'm looking into ways to animate them better.

- Cheat mode - I've been planning a feature which would let you
  preview moves as you hover over Pits. I'm not sure what this will look like
  exactly, but we'll see.

- Themes & Skins - It might be nice for players to change the look of
  the game beyond simple light/dark mode. As time goes on I will look into the possibility
  of adding skins for the game, so it can look nicer than the monochrome version of today!
