import React from 'react';
import ModalBody from './ModalBody';
import ModalOuter from './ModalOuter';

interface RoadmapModalProps {
  closeModal: () => void;
}

function RoadmapModal({ closeModal }: RoadmapModalProps) {
  return (
    <ModalOuter>
      <ModalBody title="About Ntchuva" closeModal={closeModal}>
        <div style={{ minHeight: '1rem' }} />
        <h3>Roadmap</h3>
        <p>Here are some planned features for Ntchuva:</p>
        <ul>
          <li>
            <strong>Online play</strong> - I&apos;m planning to implement serverless PvP games based
            on auto-generated activation codes. It will probably use Google Firebase.
          </li>
          <li>
            <strong>Computer opponent</strong> - I&apos;m making notes for how to add PvE play using
            a computer-controlled opponent. I have no idea how good or bad the computer player will
            be, but it will be fun to try and make it happen.
          </li>
          <li>
            <strong>Mobile app</strong> - This web game was created in React, but I also make React
            Native apps, so this is a definite possibility for the future.
          </li>
          <li>
            <strong>Better Seed animations</strong> - The current implementation uses React Spring
            as a quick-and-dirty way to make the Seeds look like they&apos;re rolling around in a
            bowl-shaped Pit. I&apos;m looking into ways to animate them better.
          </li>
          <li>
            <strong>Cheat mode</strong> - I&apos;ve been planning a feature which would let you
            preview moves as you hover over Pits. I&apos;m not sure what this will look like
            exactly, but we&apos;ll see.
          </li>
          <li>
            <strong>Themes &amp; Skins</strong> - It might be nice for players to change the look of
            the game beyond simple light/dark mode. As time goes on I will look into the possibility
            of adding skins for the game, so it can look nicer than the monochrome version of today!
          </li>
        </ul>
      </ModalBody>
    </ModalOuter>
  );
}

export default RoadmapModal;
