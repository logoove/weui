<!DOCTYPE html>
<html>
<meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0">
  <link rel="stylesheet" href="../style/weui.css"/>
  <link rel="stylesheet" href="../style/weui2.css"/>
  <link rel="stylesheet" href="../style/weui3.css"/>
      <script src="../zepto.min.js"></script>
<head>
    <meta charset="UTF-8">
    <title>弹出选择层</title>
    <style>
.keybroad-province {
            background: #FFF;
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 111;
            clear: both;
            overflow: hidden;
        }
        .keybroad-province .top-line {
            width: 100%;
            clear: both;
            display: block;
            text-align: right;
            border-bottom: 1px solid #EEE;
        }
        .keybroad-province .btn-packup {
            display: inline-block;
            padding: 4px;
            font-size: 16px;
        }
        .font-link {
            color: #576B95 !important;
        }
        a {
            text-decoration: none;
        }
        .keybroad-province .kaybroad-value {
            float: left;
            width: 11.11%;
            border-bottom: 1px solid #EEE;
            border-right: 1px solid #EEE;
            margin-left: -1px;
            text-align: center;
            padding: 5px 0;
            font-size: 18px;
            display: inline-block;
            position: relative;
        }
        .font-black {
            color: #000 !important;
        }
        .keybroad-province .kaybroad-value.chosen {
            background: #09BB07;
            color: #FFF !important;
        }
    </style>
</head>
<body>

<div class="page-hd">
        <h1 class="page-hd-title">
            选择弹出层
        </h1>
        <p class="page-hd-desc">主要用于选择大段短字段选项</p>
    </div>
    
 <div class="weui_cells weui_cells_form">
            <div class="weui_cell">
                <div class="weui_cell_hd"><label class="weui_label" ><span id="city">Q</span><span class="icon icon-74 f18" id="icon"></span></label></div>
                <div class="weui_cell_bd weui_cell_primary">
                    <input class="weui_input" type="text"  placeholder="字母" id="v1"/>
                </div>
            </div>
</div>
<div class="keybroad-province hide" id="province">
    <div class="top-line"><a href="javascript:void(0)" onclick="$('#province').hide()" class="btn-packup font-link">收起</a></div>
    <?php
    $arr = range('A','Z');
   foreach ($arr as $v){
       $chosen = ($v=='Q')?"chosen":"";
      echo "<a href='javascript:void(0);' onclick='sprovince(this,\"".$v."\")'  class='kaybroad-value $chosen font-black' >".$v."</a>";
   }

    ?>

</div>
<script>
    function sprovince($this,val){
       $($this).addClass('chosen').siblings().removeClass('chosen');
      $('#city').html(val);
      $('#v1').val(val);
      $('#province').hide();
    }
    $(function(){
    $('#v1').val('');
        $('#city,#icon').click(function(){
            $('#province').show();
            
            
        });
    })
</script>
<?php

?>
</body>
</html>