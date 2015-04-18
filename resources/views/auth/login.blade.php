<!DOCTYPE HTML5>
<html>
<head>
    <link rel="stylesheet" href="/packages/semantic-ui/dist/semantic.min.css"/>
    <link rel="stylesheet" href="/packages/semantic-ui/dist/components/dropdown.min.css"/>


    <script src="/packages/jquery/dist/jquery.min.js"></script>
    <script src="/packages/semantic-ui/dist/semantic.min.js" type="text/javascript"></script>
    <script src="/packages/semantic-ui/dist/components/dropdown.min.js" type="text/javascript"></script>
    <style>
        .avatar-menu {
            height: 2em !important;
            width: 2em !important;
            margin-top: -0.5em;
            margin-bottom: -0.5em;
        }
    </style>
</head>

<body>

<div class="ui" style="background-color: #4c1d6e">

    <h2 class="ui header inverted" style="padding: 10px;">
        <img src="/images/uplogo.png">

        <div class="content">
            Success Model
            <div class="sub header">ระบบฐานข้อมูลโครงการหนึ่งคณะหนึ่งโมเดล</div>
        </div>
    </h2>

</div>

<div class="ui padded  grid ">
    <div class="twelve wide column">
        <div class="ui purple segment">
            Purple
        </div>
    </div>
    <div class="four wide column">
        <div class="ui top attached purple inverted  segment">
            <h4>เข้าใช้งานระบบ / Sign in</h4>
        </div>
        <div class="ui attached segment">
            <form class="ui form">
                <div class="ui fluid left icon input field">
                    <i class="mail icon"></i>
                    <input type="text" placeholder="E-Mail Address">
                </div>
                <div class="ui fluid left icon input field">
                    <i class="lock icon"></i>
                    <input type="password" placeholder="E-Mail Address">
                </div>

                <div class="fluid ui primary button">User Login</div>

            </form>
        </div>
    </div>
</div>
</div>


<script type="text/javascript">
    $('.ui.dropdown').dropdown();
</script>

<script type="text/javascript" src="/packages/flow.js/dist/flow.min.js"></script>
<script type="text/javascript" src="/packages/angular/angular.min.js"></script>
<script type="text/javascript" src="/packages/angular-semantic-ui/dist/angular-semantic-ui.min.js"></script>
<script type="text/javascript" src="/packages/angular-ui-router/release/angular-ui-router.min.js"></script>
<script type="text/javascript" src="/packages/ng-flow/dist/ng-flow.min.js"></script>


@yield('javascript')

</body>
</html>