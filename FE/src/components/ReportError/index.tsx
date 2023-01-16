const ReportError = () => (
  <div className="h-full flex flex-col items-center p-8">
    <div className="text-2xl">오류 사항 제보</div>
    <div className="h-full flex items-center">
      <address className="flex flex-col gap-2">
        <span>오류사항이나 피드백사항들은 </span>
        <a href="mailto:jinlog9@gmail.com" className="text-navy">
          jinlog@gmail.com
        </a>
        으로 메일을 주시면 해당사항 빠른 시일내에 적용이 가능합니다.
        <br />
      </address>
    </div>
  </div>
);

export default ReportError;
