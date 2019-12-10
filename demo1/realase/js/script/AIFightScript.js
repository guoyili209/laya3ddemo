var __extends=this&&this.__extends||function(){var t=function(a,e){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,a){t.__proto__=a}||function(t,a){for(var e in a)a.hasOwnProperty(e)&&(t[e]=a[e])})(a,e)};return function(a,e){function r(){this.constructor=a}t(a,e),a.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}}(),AIFightScript=function(t){function a(){var a=t.call(this)||this;return a._pTargetPosVec3=new Laya.Vector3,a._skillWord=["雷电术","刀光剑影"],a._damageMax=1e3,a}return __extends(a,t),a.prototype.clear=function(){Laya.timer.clearAll(this),Laya.Tween.clearAll(this),this._pCharacter=null,this._pRoleSp3D=null,this._pAttackedTarget=null,this._pTargetPosVec3=null},a.prototype._load=function(t){this._pCharacter=this.owner,this._pRoleSp3D=this._pCharacter.roleSp3D},a.prototype._start=function(t){},a.prototype._update=function(t){},a.prototype.skillAttack=function(t){var a=Math.floor(2*Math.random()+1);this._pCharacter.changeAction(CharacterActionStateConst.ATTACK),this._pCharacter.fromActionState=CharacterActionStateConst.SKILL,this._pCharacter.toActionState=CharacterActionStateConst.IDLE,this._pCharacter.skillShowWord(this._skillWord[a-1]);for(var e=Math.floor(Math.random()*this._damageMax),r=0,o=t;r<o.length;r++){var n=o[r];n.data.life-=e,n.data.life<=0&&AIFightControl.instance.removeDieCharacter(n.camp,n.fightPoint)}Laya.timer.once(300,this,function(){for(var r=0,o=t;r<o.length;r++){var n=o[r];n.hitedShowDamageNu(e);var i=void 0,c=void 0,h=new Laya.Vector3;SceneManager.instance.orthographicCoordToScreenCoord(n.transform.position,h),i=h.x,c=h.y;var s=BattleMagic.create("res/fx/"+a+"/"+a,!1,i,c,300,300);s.scale(1,1),s.scene=SceneManager.instance.effectLayer2D,s.dep=c+21,Laya.stage.addChild(s),s.effPart.scale(1,1),2==a&&(n.camp==CampType.Enemy||(s.effPart.scaleX=-1)),s.play(),n.data.life>0?(n.changeAction(CharacterActionStateConst.HIT),n.fromActionState=CharacterActionStateConst.HIT,n.toActionState=CharacterActionStateConst.IDLE):(n.changeAction(CharacterActionStateConst.DIE),n.fromActionState=CharacterActionStateConst.DIE,n.toActionState=CharacterActionStateConst.DIE)}})},a.prototype.normalAttack=function(t){Laya.timer.clearAll(this),Laya.Tween.clearAll(this._pTargetPosVec3),this._pAttackedTarget=t;var a=t.transform.position.clone();t.camp==CampType.Enemy?(a.x+=1.5,a.y-=1):t.camp==CampType.Player&&(a.x-=1.5,a.y+=1),this._pTargetPosVec3=this._pCharacter.transform.position.clone(),Laya.Tween.to(this._pTargetPosVec3,{x:a.x,y:a.y,z:a.z},200,Laya.Ease.linearNone,Laya.Handler.create(this,this._moveComplete)),Laya.timer.frameLoop(1,this,this._modifyPosition),Math.random()<.5&&(this._pCharacter.ghost=!0)},a.prototype._moveComplete=function(){var t=this;if(Laya.timer.clearAll(this),this._pCharacter){this._pCharacter.changeAction(CharacterActionStateConst.ATTACK);var a=Math.floor(Math.random()*this._damageMax),e=!1;Math.random()>.5&&(a=9999,e=!0),this._pAttackedTarget.data.life-=a,this._pAttackedTarget.data.life<=0&&AIFightControl.instance.removeDieCharacter(this._pAttackedTarget.camp,this._pAttackedTarget.fightPoint),Laya.timer.once(300,this,function(){e&&t._pAttackedTarget.hitedFireBody(),t._pAttackedTarget.hitedShowDamageNu(a),t._pAttackedTarget.data.life>0?(t._pAttackedTarget.changeAction(CharacterActionStateConst.HIT),t._pAttackedTarget.fromActionState=CharacterActionStateConst.HIT,t._pAttackedTarget.toActionState=CharacterActionStateConst.IDLE):(t._pAttackedTarget.changeAction(CharacterActionStateConst.DIE),t._pAttackedTarget.lifeState="die",t._pAttackedTarget.fromActionState=CharacterActionStateConst.DIE,t._pAttackedTarget.toActionState=CharacterActionStateConst.DIE)}),this._pCharacter.fromActionState=CharacterActionStateConst.ATTACK,this._pCharacter.toActionState=CharacterActionStateConst.IDLE}else Laya.Tween.clearAll(this)},a.prototype._modifyPosition=function(){this._pCharacter.transform.position=this._pTargetPosVec3},a}(Laya.Script);