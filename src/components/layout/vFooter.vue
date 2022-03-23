<template>
  <footer class="footer">
    <div class="container-fluid">
      <div class="footer__container">
        <div class="row">
          <div class="col-xs-12 col-sm-6 col-md-4 col-lg-auto">
            <ul class="footer__items">
              <li class="footer__item"><a href="#">Lorem ipsum</a></li>
              <li class="footer__item"><a href="#">dolor sit amet</a></li>
              <li class="footer__item"><a href="#">consectetur adipisicing</a></li>
            </ul>
          </div>

          <div class="col-xs-12 col-sm-6 col-md-4 col-lg-auto">
            <ul class="footer__items">
              <li class="footer__item"><a href="#">Lorem ipsum</a></li>
              <li class="footer__item"><a href="#">dolor sit amet</a></li>
              <li class="footer__item"><a href="#">consectetur adipisicing</a></li>
            </ul>
          </div>

          <div class="col-xs-12 col-sm-6 col-md-4 col-lg-auto">
            <ul class="footer__items">
              <li class="footer__item"><a href="#">Lorem ipsum</a></li>
              <li class="footer__item"><a href="#">dolor sit amet</a></li>
              <li class="footer__item"><a href="#">consectetur adipisicing</a></li>
            </ul>
          </div>

          <div class="col-xs-12 col-sm-6 col-md-4 col-lg-auto">
            <p class="footer__text">
              © {{ year }} Logo
              <span>Lorem ipsum dolor sit amet.</span>
            </p>
          </div>

          <div class="col-xs-12 col-sm-6 col-md-4 col-lg-auto">
            <ul class="footer__items">
              <li class="footer__item footer__item--phone">
                <a href="tel:49123456789">+49 (0) 123 456 78 9</a>
              </li>
              <li class="footer__item"><a href="#">Contact</a></li>
              <li class="footer__item footer__item--instagram">
                <a href="#">Instagram</a>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </div>
  </footer>
</template>

<script>

export default {
  props: {},

  computed: {
    year() {
      return new Date().getFullYear();
    }
  },
}
</script>

<style lang="scss" scoped>
.footer {
  background-color: $background-gray;
  margin-top: 4rem;

  &__container {
    padding: 2rem 0 0;
  }

  &__items {
    padding: 0 1rem 2rem 1rem;
    margin: 0;
  }

  &__item {
    list-style: none;

    a {
      color: $color-text;
    }

    &--phone {
      font-weight: 600;
    }

    &--instagram a {
      color: $color-primary;
    }

    @media(max-width: $screen-sm-max) {
      text-align: center;
    }
  }

  &__text {
    max-width: 20rem;
    color: $color-icons;
    padding: 0 1rem 2rem 1rem;

    span {
      color: $text-muted;
      display: block;
    }

    @media(max-width: $screen-sm-max) {
      text-align: center;
      max-width: 100%;

    }
  }
}
</style>