<template>
  <footer id="footer">
    <div class="container d-md-flex py-4">
      <div class="col-lg-3 footer-contact">
        <h3>SSAFY</h3>
        <p>
          <strong>Happy House</strong> <br />
          <br />
          <strong>Contributor:</strong> 박성현 박주미<br />
          <strong>Email:</strong>
          <span> tjdeorkfl95@naver.com, zummy@kakao.com</span><br />
        </p>
      </div>

      <div class="mr-md-auto text-center text-md-left py-5 pl-5">
        <br /><br />
        <div class="copyright">
          &copy; Copyright <strong><span>박성현, 박주미</span></strong
          >. All Rights Reserved
        </div>
        <div class="credits">
          Designed by <a href="https://www.ssafy.com">ssafy</a>
        </div>
      </div>
      <!-- <div class="social-links text-center text-md-right py-5">
        <a href="#" class="twitter"><i class="bx bxl-twitter"></i></a>
        <a href="#" class="facebook"><i class="bx bxl-facebook"></i></a>
        <a href="#" class="instagram"><i class="bx bxl-instagram"></i></a>
        <a href="#" class="google-plus"><i class="bx bxl-skype"></i></a>
        <a href="#" class="linkedin"><i class="bx bxl-linkedin"></i></a>
      </div> -->
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style>
#footer {
  color: #37423b;
  font-size: 14px;
  background: #eef0ef;
  position: absolute;
  width: 100%;
  height: 250px;
  padding-top: 10px;
}

#footer .credits {
  padding-top: 5px;
  font-size: 13px;
}

#footer .credits a {
  color: #3ac162;
  transition: 0.3s;
}

#footer .credits a:hover {
  color: #5fcf80;
}

#footer .social-links a {
  font-size: 18px;
  display: inline-block;
  background: #5fcf80;
  color: #fff;
  line-height: 1;
  padding: 8px 0;
  margin-right: 4px;
  border-radius: 50%;
  text-align: center;
  width: 36px;
  height: 36px;
  transition: 0.3s;
}

#footer .social-links a:hover {
  background: #3ac162;
  color: #fff;
  text-decoration: none;
}
</style>
