import React from 'react';
import ModalBody from './ModalBody';
import ModalOuter from './ModalOuter';
import NtchuvaBoard from '../../assets/ntchuva-board.jpg';

interface AboutModalProps {
  closeModal: () => void;
}

function AboutModal({ closeModal }: AboutModalProps) {
  return (
    <ModalOuter>
      <ModalBody title="About Ntchuva" closeModal={closeModal}>
        <div style={{ minHeight: '1rem' }} />
        <h3>What is Ntchuva?</h3>
        <img
          className="about-pic"
          src={NtchuvaBoard}
          alt="Hand-carved Ntxuva board from Mozambique"
        />
        <div style={{ minHeight: '1rem' }} />
        <p>
          In the summer of 2022, a buddy of mine returned from a trip to Mozambique excitedly
          talking about a hand-carved boardgame he&apos;d picked up and offered to teach it to me.
          The locals had called it &quot;Ntxuva&quot;. I was immediately hooked by the simplicity of
          the rules and the hidden complexity of the gameplay, and decided to program my own
          version.
        </p>
        <p>
          &quot;Ntchuva&quot; (the more common spelling, according to the internet) turns out to be
          a simplified version of a game called &quot;Bao&quot; which means &quot;Board&quot; in
          Swahili. Bao is played across East Africa and has attracted the attention of scholars,
          experts and players across the world.
        </p>
        <p>
          This simplified version is sometimes called &quot;Bao la Kujifunza&quot;, &quot;Bao for
          Beginners&quot; or &quot;Mbili-mbili&quot;.
        </p>
        <p>
          Bao is a member of a class of capture games called &quot;Mancala&quot;, one of the oldest
          forms of board games. Although nobody knows exactly how old Mancala games are, possible
          versions have been found in a 7th-century settlement in Ethiopia and 2nd-3rd century Roman
          bath house in Isreal. The game may even have been played in Ancient Egypt!
        </p>
        <p>
          I hope you enjoy playing Ntchuva as much as I do, and I hope this simple version does some
          justice to the game. Please check out the Roadmap for planned features!
        </p>
        <div style={{ minHeight: '1rem' }} />
        <h3>Further Reading</h3>
        <p>
          <a
            href="https://mancala.fandom.com/wiki/Bao_la_Kujifunza"
            target="_blank"
            rel="noreferrer"
          >
            https://mancala.fandom.com/wiki/Bao_la_Kujifunza
          </a>
        </p>
        <p>
          <a href="https://en.wikipedia.org/wiki/Bao_(game)" target="_blank" rel="noreferrer">
            https://en.wikipedia.org/wiki/Bao_(game)
          </a>
        </p>
        <p>
          <a href="https://en.wikipedia.org/wiki/Mancala" target="_blank" rel="noreferrer">
            https://en.wikipedia.org/wiki/Mancala
          </a>
        </p>
      </ModalBody>
    </ModalOuter>
  );
}

export default AboutModal;
