// This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

(function (root, factory) {
    if (typeof module === 'object' && module.exports) {
      module.exports = factory(require('kaitai-struct/KaitaiStream'));
    } else {
      root.Hccapx = factory(root.KaitaiStream);
    }
  }(this, function (KaitaiStream) {
  /**
   * Native format of Hashcat password "recovery" utility
   * @see {@link https://hashcat.net/wiki/doku.php?id=hccapx|Source}
   */
  
  var Hccapx = (function() {
    function Hccapx(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;
  
      this._read();
    }
    Hccapx.prototype._read = function() {
      this.records = [];
      while (!this._io.isEof()) {
        this.records.push(new HccapxRecord(this._io, this, this._root));
      }
    }
  
    var HccapxRecord = Hccapx.HccapxRecord = (function() {
      function HccapxRecord(_io, _parent, _root) {
        this._io = _io;
        this._parent = _parent;
        this._root = _root || this;
  
        this._read();
      }
      HccapxRecord.prototype._read = function() {
        this.magic = this._io.ensureFixedContents([72, 67, 80, 88]);
        this.version = this._io.readU4le();
        this.ignoreReplayCounter = this._io.readBitsInt(1) !== 0;
        this.messagePair = this._io.readBitsInt(7);
        this._io.alignToByte();
        this.lenEssid = this._io.readU1();
        this.essid = this._io.readBytes(this.lenEssid);
        this.padding1 = this._io.readBytes((32 - this.lenEssid));
        this.keyver = this._io.readU1();
        this.keymic = this._io.readBytes(16);
        this.macAp = this._io.readBytes(6);
        this.nonceAp = this._io.readBytes(32);
        this.macStation = this._io.readBytes(6);
        this.nonceStation = this._io.readBytes(32);
        this.lenEapol = this._io.readU2le();
        this.eapol = this._io.readBytes(this.lenEapol);
        this.padding2 = this._io.readBytes((256 - this.lenEapol));
      }
  
      /**
       * The version number of the .hccapx file format.
       */
  
      /**
       * Indicates if the message pair matching was done based on
       * replay counter or not.
       * 
       * Whenever it was set to 1 it means that the replay counter
       * was ignored (i.e. it was not considered at all by the
       * matching algorithm).
       * 
       * Hashcat currently does not perform any particular action
       * based on this bit, but nonetheless this information could be
       * crucial for some 3th party tools and for
       * analysis/statistics. There could be some opportunity to
       * implement some further logic based on this particular
       * information also within hashcat (in the future).
       */
  
      /**
       * The message_pair value describes which messages of the 4-way
       * handshake were combined to form the .hccapx structure. It is
       * always a pair of 2 messages: 1 from the AP (access point)
       * and 1 from the STA (client).
       * 
       * Furthermore, the message_pair value also gives a hint from
       * which of the 2 messages the EAPOL origins. This is
       * interesting data, but not necessarily needed for hashcat to
       * be able to crack the hash.
       * 
       * On the other hand, it could be very important to know if
       * “only” message 1 and message 2 were captured or if for
       * instance message 3 and/or message 4 were captured too. If
       * message 3 and/or message 4 were captured it should be a hard
       * evidence that the connection was established and that the
       * password the client used was the correct one.
       */
  
      /**
       * The flag used to distinguish WPA from WPA2 ciphers. Value of
       * 1 means WPA, other - WPA2.
       */
  
      /**
       * The final hash value. MD5 for WPA and SHA-1 for WPA2
       * (truncated to 128 bit).
       */
  
      /**
       * The BSSID (MAC address) of the access point.
       */
  
      /**
       * Nonce (random salt) generated by the access point.
       */
  
      /**
       * The MAC address of the client connecting to the access point.
       */
  
      /**
       * Nonce (random salt) generated by the client connecting to the access point.
       */
  
      /**
       * The length of the EAPOL data.
       */
  
      return HccapxRecord;
    })();
  
    return Hccapx;
  })();
  return Hccapx;
  }));