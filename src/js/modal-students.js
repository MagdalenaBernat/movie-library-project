'use strict';

import ghLogo from '../images/github-mark.png';
import linkeInLogo from '../images/linkedIn_logo.png';
import magdalena from '../images/students/magdalena.jpg';
import mateusz from '../images/students/mateusz.jpg';
import dominika from '../images/students/profile.jpg';
import jacek from '../images/students/jacek.jpg';
import kamil from '../images/students/kamil.jpg';
import krzysztof from '../images/students/krzysztof.jpg';
import maciej from '../images/students/maciej.jpg';

const studentsModal = document.querySelector('.students-modal');
const studentsLink = document.querySelector('.footer__link');

studentsLink.addEventListener('click', renderStudentsModal);

export function renderStudentsModal() {
  studentsModal.classList.remove('is-hidden');
  const markup = `
  <div class="students-modal__backdrop">
    <div class="students-modal__container">
      <button type="button" class="students-modal__close-btn">
        <svg
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M8 8L22 22" stroke="black" stroke-width="2" />
          <path d="M8 22L22 8" stroke="black" stroke-width="2" />
        </svg>
      </button>
      <h2 class="students-modal__title">group 2</h2>
      <ul class="students-modal__list">
        <li class="students-modal__item">
          <img
            class="students-modal__image"
            src="${magdalena}"
            alt="Profile picture of Magdalena"
          />
          <div class="students-modal__description">
            <div>
              <h3 class="students-modal__name">Magdalena</h3>
              <p><span class="students-modal__function">Team leader</span></p>
            </div>
            <div class="students-modal__socials">
              <a
                href="https://www.linkedin.com/in/magdalena-bernat-34a85172/"
                target="_blank"
                rel="noreferrer noopener"
              >
                <img
                  src="${linkeInLogo}"
                  class="students-modal__link-logo"
                  alt="LinkedIn logo"
                />
              </a>
              <a
                href="https://github.com/MagdalenaBernat"
                target="_blank"
                rel="noreferrer noopener"
              >
                <img
                  src="${ghLogo}"
                  class="students-modal__link-logo"
                  alt="GitHub logo"
                />
              </a>
            </div>
          </div>
        </li>
        <li class="students-modal__item">
          <img
            class="students-modal__image"
            src="${mateusz}"
            alt="Profile picture of Mateusz"
          />
          <div class="students-modal__description">
            <div>
              <h3 class="students-modal__name">Mateusz</h3>
              <p><span class="students-modal__function">Scrum master</span></p>
            </div>
            <div class="students-modal__socials">
              <a
                href="https://www.linkedin.com/in/mateusz-piszczatowski-592264267/"
                target="_blank"
                rel="noreferrer noopener"
              >
                <img
                  src="${linkeInLogo}"
                  class="students-modal__link-logo"
                  alt="LinkedIn logo"
                />
              </a>
              <a
                href="https://github.com/MateuszPiszczatowski"
                target="_blank"
                rel="noreferrer noopener"
              >
                <img
                  src="${ghLogo}"
                  class="students-modal__link-logo"
                  alt="GitHub logo"
                />
              </a>
            </div>
          </div>
        </li>
        <li class="students-modal__item">
          <img
            class="students-modal__image"
            src="${dominika}"
            alt="Profile picture of Dominika"
          />
          <div class="students-modal__description">
            <div>
              <h3 class="students-modal__name">Dominika</h3>
              <p><span class="students-modal__function">Developer</span></p>
            </div>
            <div class="students-modal__socials">
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer noopener"
              >
                <img
                  src="${linkeInLogo}"
                  class="students-modal__link-logo"
                  alt="LinkedIn logo"
                />
              </a>
              <a
                href="https://github.com/"
                target="_blank"
                rel="noreferrer noopener"
              >
                <img
                  src="${ghLogo}"
                  class="students-modal__link-logo"
                  alt="GitHub logo"
                />
              </a>
            </div>
          </div>
        </li>
        <li class="students-modal__item">
          <img
            class="students-modal__image"
            src="${jacek}"
            alt="Profile picture of Jacek"
          />
          <div class="students-modal__description">
            <div>
              <h3 class="students-modal__name">Jacek</h3>
              <p><span class="students-modal__function">Developer</span></p>
            </div>
            <div class="students-modal__socials">
              <a
                href="https://www.linkedin.com/in/jacek-w%C3%B3jciak-230a33266/"
                target="_blank"
                rel="noreferrer noopener"
              >
                <img
                  src="${linkeInLogo}"
                  class="students-modal__link-logo"
                  alt="LinkedIn logo"
                />
              </a>
              <a
                href="https://github.com/frbanka"
                target="_blank"
                rel="noreferrer noopener"
              >
                <img
                  src="${ghLogo}"
                  class="students-modal__link-logo"
                  alt="GitHub logo"
                />
              </a>
            </div>
          </div>
        </li>
        <li class="students-modal__item">
          <img
            class="students-modal__image"
            src="${kamil}"
            alt="Profile picture of Kamil"
          />
          <div class="students-modal__description">
            <div>
              <h3 class="students-modal__name">Kamil</h3>
              <p><span class="students-modal__function">Developer</span></p>
            </div>
            <div class="students-modal__socials">
              <a
                href="https://www.linkedin.com/in/kamil-żurawski-9820b0179/"
                target="_blank"
                rel="noreferrer noopener"
              >
                <img
                  src="${linkeInLogo}"
                  class="students-modal__link-logo"
                  alt="LinkedIn logo"
                />
              </a>
              <a
                href="https://github.com/zurek28"
                target="_blank"
                rel="noreferrer noopener"
              >
                <img
                  src="${ghLogo}"
                  class="students-modal__link-logo"
                  alt="GitHub logo"
                />
              </a>
            </div>
          </div>
        </li>
        <li class="students-modal__item">
          <img
            class="students-modal__image"
            src="${krzysztof}"
            alt="Profile picture of Krzysztof"
          />
          <div class="students-modal__description">
            <div>
              <h3 class="students-modal__name">Krzysztof</h3>
              <p><span class="students-modal__function">Developer</span></p>
            </div>
            <div class="students-modal__socials">
              <a
                href="https://www.linkedin.com/in/krzysztof-olejniczak-0b1629111/"
                target="_blank"
                rel="noreferrer noopener"
              >
                <img
                  src="${linkeInLogo}"
                  class="students-modal__link-logo"
                  alt="LinkedIn logo"
                />
              </a>
              <a
                href="https://github.com/KrzysztofOlejniczak/"
                target="_blank"
                rel="noreferrer noopener"
              >
                <img
                  src="${ghLogo}"
                  class="students-modal__link-logo"
                  alt="GitHub logo"
                />
              </a>
            </div>
          </div>
        </li>
        <li class="students-modal__item">
          <img
            class="students-modal__image"
            src="${maciej}"
            alt="Profile picture of Maciej"
          />
          <div class="students-modal__description">
            <div>
              <h3 class="students-modal__name">Maciej</h3>
              <p><span class="students-modal__function">Developer</span></p>
            </div>
            <div class="students-modal__socials">
              <a
                href="https://www.linkedin.com/in/maciej-%C5%9Bwiszcz-51297023b/"
                target="_blank"
                rel="noreferrer noopener"
              >
                <img
                  src="${linkeInLogo}"
                  class="students-modal__link-logo"
                  alt="LinkedIn logo"
                />
              </a>
              <a
                href="https://github.com/bomblito11"
                target="_blank"
                rel="noreferrer noopener"
              >
                <img
                  src="${ghLogo}"
                  class="students-modal__link-logo"
                  alt="GitHub logo"
                />
              </a>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
    `;
  studentsModal.insertAdjacentHTML('afterbegin', markup);

  const closeBtn = document.querySelector('.students-modal__close-btn');

  closeBtn.addEventListener('click', () => {
    studentsModal.classList.add('is-hidden');
    studentsModal.innerHTML = '';
  });

  const backdrop = document.querySelector('.students-modal__backdrop');

  backdrop.addEventListener('click', function closeModal(event) {
    if (!event.target.closest('.students-modal__container')) {
      studentsModal.classList.add('is-hidden');
      backdrop.removeEventListener('click', closeModal);
      studentsModal.innerHTML = '';
    }
  });

  document.addEventListener('keydown', function escapeKey(event) {
    if (event.key === 'Escape') {
      studentsModal.classList.add('is-hidden');
      document.removeEventListener('keydown', escapeKey);
      studentsModal.innerHTML = '';
    }
  });
}
