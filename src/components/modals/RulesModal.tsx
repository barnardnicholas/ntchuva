import React from 'react';
import ModalBody from './ModalBody';
import ModalOuter from './ModalOuter';

interface RulesModalProps {
  closeModal: () => void;
}

function RulesModal({ closeModal }: RulesModalProps) {
  return (
    <ModalOuter>
      <ModalBody title="Rules" closeModal={closeModal}>
        <div style={{ minHeight: '1rem' }} />
        <p>
          <ul>
            <li>
              The board is divided into 32 squares, or &quot;Pits&quot;. Each player controls 16
              Pits, in 2 rows of 8.
            </li>
            <li>
              Initially, each Pit contains 2 Seeds. The object of the game is to capture all of your
              opponents Seeds. Do this, and you win!
            </li>
            <li>
              To move, select any Pit on your side of the board which contains at least 2 seeds. If
              you don&apos;t have any squares with more than one Seed, choose any occupied square to
              move.
            </li>
            <li>
              Remove all the Seeds from the selected pit and &apos;sow&apos; them, one at a time,
              into the subsequent Pits, in a clockwise direction.
            </li>
            <li>
              If the last Seed in your hand lands in a Pit which already contains Seeds, move again
              from that Pit.
            </li>
            <li>If your last Seed lands in an empty Pit, your turn is over.</li>
            <li>
              If your turn ends in a Pit in the front row (ie closest to your opponents Pits),
              capture any Seeds of theirs which are in the same column (adjacent Pits in front row
              and back row) and discard them.
            </li>
          </ul>
        </p>
        <p>
          That&apos;s it! A lot of the rules are programmed into the game already, so moving is as
          simple as clicking a Pit. Invalid choices will be disabled, and I&apos;ve added an
          &apos;Auto-Move&apos; feature in the Settings Menu for situations where you only have one
          valid move.
        </p>
        <p>
          Games are quite short, and I promise that in just a few games you&apos;ll start to develop
          strategies for winning!
        </p>
      </ModalBody>
    </ModalOuter>
  );
}

export default RulesModal;
