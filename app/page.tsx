import ScrollToTop from "./ScrollToTop";
import Gallery3D from "./Gallery3D";
import GraphicsGallery from "./GraphicsGallery";
import CaseImage from "./CaseImage";
import AnimationGallery from "./AnimationGallery";
import HeroPhoto from "./HeroPhoto";
import FloatingNav from "./FloatingNav";

export default function Home() {
  return (
    <>
      <ScrollToTop />
      <FloatingNav />

      <div className="page-wrapper">
        <div className="main-frame">

          {/* HERO */}
          <section className="hero">
            <div className="hero-top">
              <div className="hero-description">
                <p className="about-text">
                  Николай Федосов&nbsp;— мультидисциплинарный дизайнер.
                  Разрабатываю айдентику, мыслю системами, работаю
                  с&nbsp;графикой, 3D и&nbsp;анимацией
                </p>
                <div className="contacts">
                  <a
                    href="https://t.me/whoseyournemy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-link"
                  >
                    @whoseyournemy
                  </a>
                  <a
                    href="mailto:whoseyournemy@yandex.ru"
                    className="contact-link"
                  >
                    whoseyournemy@yandex.ru
                  </a>
                  <a
                    href="https://www.behance.net/nickfedosdcc2b"
                    className="contact-link"
                  >
                    behance
                  </a>
                  <a
                    href="https://dprofile.ru/fedosovnikolai"
                    className="contact-link"
                  >
                    dprofile
                  </a>
                </div>
              </div>
            </div>

            <div className="hero-bottom">
              {/* Плейсхолдер чтобы макет не прыгал */}
              <div className="nav-menu-placeholder">
                <nav className="nav-menu">
                  <a href="#logoteka" className="nav-item">
                    <span>логотека</span>
                    <img src="/icons/arrow.svg" alt="" className="nav-arrow" />
                  </a>
                  <a href="#identity" className="nav-item">
                    <span>айдентика</span>
                    <img src="/icons/arrow.svg" alt="" className="nav-arrow" />
                  </a>
                  <a href="#graphics" className="nav-item">
                    <span>графика</span>
                    <img src="/icons/arrow.svg" alt="" className="nav-arrow" />
                  </a>
                  <a href="#threed" className="nav-item">
                    <span>3D</span>
                    <img src="/icons/arrow.svg" alt="" className="nav-arrow" />
                  </a>
                  <a href="#animation" className="nav-item">
                    <span>анимация</span>
                    <img src="/icons/arrow.svg" alt="" className="nav-arrow" />
                  </a>
                </nav>
              </div>

              <HeroPhoto />
            </div>
          </section>

          {/* ЛОГОТЕКА */}
          <section id="logoteka" className="section">
            <div className="section-divider">
              <div className="divider-line"></div>
              <h2 className="section-title">логотека</h2>
            </div>

            <div className="logo-grid">
              <div className="logo-item">
                <div className="logo-image-wrapper">
                  <img src="/images/logo-tyumen.png" alt="Тюмень" className="logo-image" />
                </div>
                <p className="logo-name">Тюмень</p>
                <p className="logo-desc">Айдентика города</p>
                <a href="https://dprofile.ru" target="_blank" rel="noopener noreferrer" className="btn-blue">Кейс на Dprofile</a>
              </div>

              <div className="logo-item">
                <div className="logo-image-wrapper">
                  <img src="/images/logo-kmu.png" alt="КМУ" className="logo-image" />
                </div>
                <p className="logo-name">КМУ</p>
                <p className="logo-desc">ЛГУ им. Пушкина</p>
              </div>

              <div className="logo-item">
                <div className="logo-image-wrapper">
                  <img src="/images/logo-astro.png" alt="Astro" className="logo-image" />
                </div>
                <p className="logo-name">Astro</p>
                <p className="logo-desc">Астрономическое сообщество</p>
              </div>

              <div className="logo-item">
                <div className="logo-image-wrapper">
                  <img src="/images/logo-paleopark.png" alt="Палеопарк России" className="logo-image" />
                </div>
                <p className="logo-name">Палеопарк России</p>
                <p className="logo-desc">Палеонтологический парк</p>
              </div>

              <div className="logo-item">
                <div className="logo-image-wrapper">
                  <img src="/images/logo-platoria.png" alt="Platoria" className="logo-image" />
                </div>
                <p className="logo-name">Platoria</p>
                <p className="logo-desc">Ai-помощник выбора товаров</p>
              </div>

              <div className="logo-item">
                <div className="logo-image-wrapper">
                  <img src="/images/logo-imsa.png" alt="IMSA" className="logo-image" />
                </div>
                <p className="logo-name">IMSA</p>
                <p className="logo-desc">Integrated Marketing Services Agency</p>
              </div>

              <div className="logo-item">
                <div className="logo-image-wrapper">
                  <img src="/images/logo-nobody.png" alt="Nobody" className="logo-image" />
                </div>
                <p className="logo-name">Nobody</p>
                <p className="logo-desc">Сервис отслеживания цифрового следа</p>
              </div>

              <div className="logo-item">
                <div className="logo-image-wrapper">
                  <img src="/images/logo-pulse.png" alt="Pulse" className="logo-image" />
                </div>
                <p className="logo-name">Pulse</p>
                <p className="logo-desc">Цифровой банк</p>
              </div>

              <div className="logo-item logo-item-soon">
                <div className="logo-image-wrapper soon-wrapper">
                  <p className="soon-text">в работе...</p>
                </div>
              </div>
            </div>
          </section>

          {/* АЙДЕНТИКА */}
          <section id="identity" className="section">
            <div className="section-divider">
              <div className="divider-line"></div>
              <h2 className="section-title">айдентика</h2>
            </div>

            <div className="case">
              <div className="case-info">
                <span className="case-label">(Кейс 1)</span>
                <h3 className="case-name">Ребрендинг IMSA</h3>
                <p className="case-subtitle">Integrated Marketing Services Agency</p>
                <p className="case-text">
                  Разработал новую концепцию «Idea → Mission → Solution → Aim», заложил
                  символизм через путь, который проходит команда вместе с&nbsp;клиентом
                  в&nbsp;каждом проекте
                </p>
                <p className="case-text">
                  Провел предпроектный анализ, собрал воедино ключевые идеи агентства
                  и&nbsp;позиционирование, фирменный стиль стал выглядеть современнее
                  на фоне конкурентов
                </p>
                <a href="#" target="_blank" rel="noopener noreferrer" className="btn-blue">Брендбук</a>
              </div>
              <CaseImage src="/images/case-imsa.jpg" alt="Кейс IMSA" />
            </div>

            <div className="case">
              <div className="case-info">
                <span className="case-label">(Кейс 2)</span>
                <h3 className="case-name">Тюмень</h3>
                <p className="case-subtitle">Айдентика города</p>
                <p className="case-text">
                  В основу дизайн-решения была положена идея блоков, это&nbsp;позволило
                  разработать систему-конструктор и&nbsp;развить её на&nbsp;всех носителях.
                  Образ получился ярким, гибким и динамичным, что&nbsp;позволило раскрыть
                  облик города во всех красках и переосмыслить исторические символы города.
                </p>
                <p className="case-text">
                  Провел предпроектный анализ, выявил ключевые образы, цветовые коды
                </p>
                <a href="https://dprofile.ru" target="_blank" rel="noopener noreferrer" className="btn-blue">Кейс на Dprofile</a>
              </div>
              <CaseImage src="/images/case-tyumen.jpg" alt="Кейс Тюмень" />
            </div>

            <div className="case">
              <div className="case-info">
                <span className="case-label">(Кейс 3)</span>
                <h3 className="case-name">Ильинская Слобода</h3>
                <p className="case-subtitle">Территориальный брендинг</p>
                <p className="case-text">
                  Разработан территориальный брендинг Ильинской Слободы, на основе
                  исторических, архитектурных и&nbsp;природных достопримечательностей.
                </p>
                <p className="case-text">
                  Создана навигация и&nbsp;сувенирная продукция. Геральдика лаконично
                  вписалась в контекст территории с&nbsp;её множеством символов и&nbsp;смыслов.
                </p>
                <a href="https://dprofile.ru" target="_blank" rel="noopener noreferrer" className="btn-blue">Кейс на Dprofile</a>
              </div>
              <CaseImage src="/images/case-sloboda.jpg" alt="Кейс Ильинская Слобода" />
            </div>

            <div className="case">
              <div className="case-info">
                <span className="case-label">(Кейс 4)</span>
                <h3 className="case-name">Рубеж</h3>
                <p className="case-subtitle">Айдентика отряда</p>
                <p className="case-text">
                  В основе идеи лежит линия — рубеж, проходя который дети растут
                  в&nbsp;своих навыках, учатся помогать и&nbsp;набираются дисциплине. Эта&nbsp;идея
                  заложена в&nbsp;знаке, где из&nbsp;грубого, текст переходит в&nbsp;ровный и&nbsp;аккуратный
                </p>
                <p className="case-text">
                  Провел предпроектный анализ, выявил ключевые образы, цветовые коды
                </p>
              </div>
              <CaseImage src="/images/case-rubezh.jpg" alt="Кейс Рубеж" />
            </div>
          </section>

          {/* ГРАФИКА */}
          <section id="graphics" className="section">
            <div className="section-divider">
              <div className="divider-line"></div>
              <h2 className="section-title">графика</h2>
            </div>
            <GraphicsGallery />
          </section>

          {/* 3D */}
          <section id="threed" className="section">
            <div className="section-divider">
              <div className="divider-line"></div>
              <h2 className="section-title">3D</h2>
            </div>
            <Gallery3D />
          </section>

          {/* АНИМАЦИЯ */}
          <section id="animation" className="section">
            <div className="section-divider">
              <div className="divider-line"></div>
              <h2 className="section-title">анимация</h2>
            </div>
            <AnimationGallery />
          </section>

          {/* ФУТЕР */}
          <footer className="site-footer">
            <div className="footer-divider"></div>
            <p className="footer-text">
              Конец страницы — начало проекта. Готов его обсудить{" "}
              <a
                href="https://t.me/whoseyournemy"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                @whoseyournemy
              </a>
            </p>
          </footer>

        </div>
      </div>
    </>
  );
}