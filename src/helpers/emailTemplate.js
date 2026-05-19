const mailTemplate = (content) => `<div style="margin: 0; padding: 0">
<table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
   <tbody>
      <tr>
         <td
            style="font-size: 11px; font-family: Arial, Tahoma; color: #ffffff; line-height: 16px; padding: 5px 0"
            bgcolor="#ff5b00"
            align="center">
            Để email luôn được vào inbox, bạn vui lòng đánh dấu email<br />
            này "Không phải thư quảng cáo / spam"
         </td>
      </tr>

      <tr>
         <td style="border: 1px solid #d9d9d9">
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%">
               <tbody>
                  <tr>
                     <td >
                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                           <tbody>
                              <tr>
                                 <td valign="top">
                                    <a
                                       ></a>
                                 </td>
                                 <td valign="top" align="right" width="200">
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                       <tbody>
                                          <tr>
                                             <td style="padding-bottom: 3px">
                                             </td>
                                          </tr>
                                          <tr>
                                             <td>
                                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                   <tbody>
                                                      <tr>
                                                      </tr>
                                                   </tbody>
                                                </table>
                                             </td>
                                          </tr>
                                       </tbody>
                                    </table>
                                 </td>
                              </tr>
                           </tbody>
                        </table>
                     </td>
                  </tr>
                  <tr>
                     <td>
                     
                     </td>
                  </tr>
                  <tr>
                     <td style="padding: 15px 20px; border-bottom: 9px solid #d9d9d9; font-family: arial">
                        <div style="padding: 0px 10px 0px 10px">
                        ${content}
                           <div>
                              <table width="100%" cellspacing="0" cellpadding="0" border="0">
                                 <tbody>
                                    <tr>
                                       <td style="font-family: arial; font-size: 12px; color: #333">Trân trọng,</td>
                                    </tr>
                                    <tr>
                                       <td style="font-family: arial; font-size: 12px; color: #333">
                                          Phòng Dịch vụ Khách hàng
                                       </td>
                                    </tr>
                                    <tr>
                                       <td style="font-family: arial; font-size: 12px; color: #333"></td>
                                    </tr>
                                 </tbody>
                              </table>
                           </div>
                        </div>
                     </td>
                  </tr>
                  <tr>
                     <td style="padding: 20px">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                           <tbody>
                              <tr>
                                 <td width="74%" style="font-size: 11px; color: #666666; font-family: arial">
                                    © 2026 |
                                    <a
                                       >Privacy Policy</a
                                    ><br />
                                   Job Hunters<br />
                                 </td>
                                 <td width="26%" align="right" valign="top">
                                    <table cellpadding="0" cellspacing="0" width="100%">
                                       <tbody>
                                          <tr>
                                             <td
                                                width="70"
                                                style="
                                                   font-size: 11px;
                                                   font-weight: bold;
                                                   color: #ff5b00;
                                                   font-family: arial;
                                                   padding-top: 5px;
                                                "
                                                align="left">
                                             </td>
                                             <td>
                                             </td>
                                          </tr>
                                       </tbody>
                                    </table>
                                 </td>
                              </tr>
                           </tbody>
                        </table>
                     </td>
                  </tr>
                  <tr></tr>
               </tbody>
            </table>
         </td>
      </tr>
   </tbody>
</table>
<p>&nbsp;</p>
<div class="yj6qo"></div>
<div class="adL"></div>
</div>
`;
export default mailTemplate;
