<template>
  <div class="table">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="加载中..."
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="Title">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="Author" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Pageviews" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="Status" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="Display_time" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{scope.row.display_time|dateFormat }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  const list = [{
    'id': '710000200105058836',
    'title': 'Ndiostqj cih sjioxje pdmtkjdrdn rdecvi rwcjuec twdhndinoz gcfdmbryn nrdet jbbmpqkc zulvnq qvlicdum cxuwurhdtf ejvkjtp kefdmifsod giyxygh eqdtkkb.',
    'status': 'deleted',
    'author': 'name',
    'display_time': '2000-03-25 07:04:13',
    'pageviews': 3744
  }, {
    'id': '120000197202216467',
    'title': 'Xcgslqisz izau vxwivrqmg iywox uwisuaf jqq run ifbkibejws umuyqx qpiqb qxku mccp nibkf okyj diljvn.',
    'status': 'deleted',
    'author': 'name',
    'display_time': '1973-12-25 06:55:52',
    'pageviews': 779
  }, {
    'id': '110000198412026461',
    'title': 'Ejy upgjusiryt fixwyykpdt wxclm ddfjqqh ujfv vhrejume pfqnqrms vnifbfg wjcvnl oaxtzpgv nzjig xdjsm bmjrr rkfgczlfh qhbw.',
    'status': 'draft',
    'author': 'name',
    'display_time': '2003-08-03 14:50:16',
    'pageviews': 2440
  }, {
    'id': '440000199602038173',
    'title': 'Wow ygvr nfqhsjqjj pccfh mempjj srpnlj sxzniwgl lgkv pthpv intkqjsilc hxjx qbhfjhh qgowud qhfnaljf hdnark rmb pxj vdev bvwiwjsm sfsbhenpnk.',
    'status': 'published',
    'author': 'name',
    'display_time': '1973-05-24 20:17:51',
    'pageviews': 4120
  }, {
    'id': '810000199805064661',
    'title': 'Gcavfs fejbcy ptdgwa dtnpxd sqrbtqafr rddo uweknptmt poep xyoejqpoc whfvuquyb yrytxjly.',
    'status': 'published',
    'author': 'name',
    'display_time': '1992-03-21 22:22:52',
    'pageviews': 908
  }, {
    'id': '63000019860813866X',
    'title': 'Lsiidgbz bjfdevns hscd ntgb idu zfik wsloj rsky roivcl tuyf lgqls lushntlsm ctgi pqzi cukynfhm mtethqtnq qrhnkiwqrb.',
    'status': 'published',
    'author': 'name',
    'display_time': '1996-09-24 03:01:54',
    'pageviews': 315
  }, {
    'id': '820000200103086863',
    'title': 'Rcmux pfhtxjv fghqtyz dqk rwmjrx cvsggefn uyiib jkkssvp osj giegstj tskjr qgfdnyx fuvdgd reetwga.',
    'status': 'draft',
    'author': 'name',
    'display_time': '1975-01-05 02:06:19',
    'pageviews': 2844
  }, {
    'id': '410000200011137073',
    'title': 'Keubrdryg fceft tvpje ddbwmqgf ysff mxeesh msavwcszns ecwl srpfyxbwi qwcvkgulcr juthwi pkwuzqs tvoegek xkbppklgi kgsyy.',
    'status': 'draft',
    'author': 'name',
    'display_time': '1973-08-07 12:32:14',
    'pageviews': 4860
  }, {
    'id': '150000200912042465',
    'title': 'Mhillscbxm jtsnfs zudhpkpsa unmjxbas grwgkoxk vqjvoqwn wnqke rgisbmvnj swyvcohpt gisy tvjjdkjny udxomis digj hdcyl ucrncfr okozdialf txczpshx gmvfrsc.',
    'status': 'deleted',
    'author': 'name',
    'display_time': '1983-04-28 06:24:04',
    'pageviews': 3308
  }, {
    'id': '330000198411199767',
    'title': 'Ptsihyookh vifcb eijksukc eslhyxjeu eczyuejfbn mpgq nndbgd xppceelvz nwhxl jjer lluetejm qtpvov zntgfc hlajbvr istkqmehsk fdbudkmpgb piefxyiad hqdgzxft ricj okpnii.',
    'status': 'published',
    'author': 'name',
    'display_time': '1972-12-21 22:44:09',
    'pageviews': 2695
  }, {
    'id': '130000197904046169',
    'title': 'Gacmrv vsllonpuq nryxryri dfwxmcck fesplwn zjlcqo nnjieibxhq fvquym dxfn phorrjjmt fhjv ohkfxsisx nxca.',
    'status': 'draft',
    'author': 'name',
    'display_time': '2012-11-21 17:40:22',
    'pageviews': 703
  }, {
    'id': '630000201202183588',
    'title': 'Uken rkbhpsm ryxo ryyuppsxb dwyirzjut uxni rjii hze qagsudqrf yemxksvgro fhsi bwmfi gzihuji wkfn.',
    'status': 'draft',
    'author': 'name',
    'display_time': '1998-02-11 08:15:32',
    'pageviews': 4793
  }, {
    'id': '220000200010232655',
    'title': 'Vtnv mbfepyi jgxirbn quggss cidzpnrae ptrta sygoj rrfne vdkox nsuwpxdl vozmxe wxhdtvnm rhusdaml eihtw hwyyi.',
    'status': 'draft',
    'author': 'name',
    'display_time': '1998-08-09 22:43:26',
    'pageviews': 1762
  }, {
    'id': '350000200002211845',
    'title': 'Isgrenkw vga jlgtt jflfawkw txwdwyven gphmoixjrv jvpqlbmlzw siuxjecbu wpmc uwvk.',
    'status': 'deleted',
    'author': 'name',
    'display_time': '2009-08-02 14:19:58',
    'pageviews': 881
  }, {
    'id': '500000199106073355',
    'title': 'Ffu shknhkad crp iem oqjpqz exi vpqhnhsrci dkgdlxno qfsid ijwgtdbcvy wltacr mktvpvlkn urgxjkpdjr cmpmthteq wejrydhu fuszkohj qdbrgnha.',
    'status': 'published',
    'author': 'name',
    'display_time': '2016-01-25 22:28:11',
    'pageviews': 1773
  }, {
    'id': '500000197210231190',
    'title': 'Vgzyvikyqe rjbuko fjtdy fwqbidcm tlax cqeudwhn xmxp emfhw lcost wpczfnmpb qoisnkfhcd lxffodirnk ffis ireslvu.',
    'status': 'draft',
    'author': 'name',
    'display_time': '2005-12-05 08:30:42',
    'pageviews': 1409
  }, {
    'id': '450000200011231681',
    'title': 'Kimv ldgkfibwy ykntaidu lndy nyqowhj mlapudfo srzi tpqa kcrp uuqlj gste.',
    'status': 'draft',
    'author': 'name',
    'display_time': '1974-11-17 12:26:48',
    'pageviews': 435
  }, {
    'id': '500000197506304555',
    'title': 'Ngpureh rtkkgon igiir nnq mwrrjeero fnuisi jlqdpgd mued jzinyfxi eswjjdg ybsd opqjlxrrrq omsn hlglnmxrm txffqg.',
    'status': 'published',
    'author': 'name',
    'display_time': '1997-10-16 14:04:20',
    'pageviews': 371
  }, {
    'id': '500000200003167215',
    'title': 'Qnrltokezb iokwtnif nxjbyefk krgjn xjycpxxsa wxqtjkdod vnsn trfwsutiyg fxlh pucqftt.',
    'status': 'published',
    'author': 'name',
    'display_time': '2019-03-10 14:38:29',
    'pageviews': 3299
  }, {
    'id': '810000201105208644',
    'title': 'Vwzvzxuy gpnwcyw fxbpjhjcq wjwji nuhyqshgl gxgbfzy tiag jnk jtvq nnkfudxm qegnq hdgozoevq hnnwsvj.',
    'status': 'published',
    'author': 'name',
    'display_time': '1994-06-06 09:03:16',
    'pageviews': 4885
  }, {
    'id': '610000201009244250',
    'title': 'Mheh rhejufvrb bohjhu yskmwmldt lnayvf rhrjbrrxpt hmyixoyh olqqxwwkuv otwjgfg wudxh sycuffrxo hhvgon rqdlovjxt ndwnl bbfpnqsx uvlrwgwrz drbqtvuz.',
    'status': 'published',
    'author': 'name',
    'display_time': '2003-06-12 07:16:56',
    'pageviews': 1085
  }, {
    'id': '120000198806143427',
    'title': 'Gqwppdu xejacsr hltgnge amqbrzsgj jifco tsntbe iqfbpew ebprxpwbur rlml ecdab jixcx pmssnd ofjexojga uzm gdbo lxhxhixd kvxkb jsnjo.',
    'status': 'deleted',
    'author': 'name',
    'display_time': '1985-05-05 22:47:36',
    'pageviews': 3053
  }, {
    'id': '530000199211271850',
    'title': 'Erjqpl puvpknhhtm saqbginku kpwz edw weq qeblvroer bshotu wrwrgtnm ririudw tugwcs oebs fjetyh wieegu yhrizyo vklw oigevmmcu.',
    'status': 'draft',
    'author': 'name',
    'display_time': '2006-04-19 23:21:02',
    'pageviews': 4627
  }, {
    'id': '820000201301264653',
    'title': 'Gbcdpcqw iuiyoq kunpp luszfu cucjlgrd nvxrrbjxrw udzhmcva jxst oswlismsb uvzhmlhb urdyn vmgfv dlfmdkpr vydnexyvr yacr npc vkohrts cqvpttw gkjbqqdpe ovntmve.',
    'status': 'draft',
    'author': 'name',
    'display_time': '1970-10-30 05:47:19',
    'pageviews': 2658
  }, {
    'id': '62000020010610728X',
    'title': 'Ctntsgxjo ndl mbslxmvn kqepekoc wpsbng gtkkej gun ngu hfg wpgdlaqhx sczbjmm nima udq ssm risus ygwmdud.',
    'status': 'draft',
    'author': 'name',
    'display_time': '2015-09-18 03:29:21',
    'pageviews': 2450
  }, {
    'id': '31000019790214165X',
    'title': 'Ccccmkwcen izmby hplckmggg hhvdxg cljbjhgao tywn fufhpbo cggqcug czxqd dwut ktootsw jjlljb fskmbgq.',
    'status': 'draft',
    'author': 'name',
    'display_time': '1996-10-27 00:43:26',
    'pageviews': 2551
  }, {
    'id': '310000197807191229',
    'title': 'Nosvxb pxtxrfip gxyka uwxpjpmo lginp dpei eopcui edgnx ddq pboyisa whlh tndjixi mcuypci hcujb ntzq mktbr wqsxsvfn medwew tsaxpgy.',
    'status': 'deleted',
    'author': 'name',
    'display_time': '2000-07-29 05:54:22',
    'pageviews': 4921
  }, {
    'id': '310000199606245189',
    'title': 'Pulv rbguggcyj ofellet iiwtgr hfzvk ypfohlrwj jykiubynk vrdjnd floyfhtil cbumyrp pobrufnc vrtnl nphuocf bwcjs.',
    'status': 'deleted',
    'author': 'name',
    'display_time': '1977-03-03 09:10:04',
    'pageviews': 668
  }, {
    'id': '510000200505084518',
    'title': 'Ylgn njql rhvhvmukl hrpc adtsdsvtz euop axesagh qlwbx evecguxkb kbcr ldtbjyf sjouw smoukyigo egvmdlwr iswstqd.',
    'status': 'published',
    'author': 'name',
    'display_time': '1994-11-24 08:39:51',
    'pageviews': 2419
  }, {
    'id': '820000198607065660',
    'title': 'Awbyby anpipzlxm qsfrpujn wjvul gbricerv qgnyk oqptonws hunlv yemm ywp pdsjrcudfe qgybcu gjwsdwtat.',
    'status': 'draft',
    'author': 'name',
    'display_time': '2013-12-14 02:08:15',
    'pageviews': 1723
  }]
  export default {
    name: 'ExampleTable',
    filters: {
      statusFilter (status) {
        const statusMap = {
          published: 'success',
          draft: 'gray',
          deleted: 'danger'
        }
        return statusMap[status]
      }
    },
    data () {
      return {
        list: [],
        listLoading: true
      }
    },
    created () {
      this.getList()
    },
    methods: {
      getList () {
        this.listLoading = true
        setTimeout(() => {
          this.list = list
          this.listLoading = false
        }, 1000)
      }
    }
  }
</script>

<style scoped lang="scss">
  .table {
    height: auto;
  }
</style>
