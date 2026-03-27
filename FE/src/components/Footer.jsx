import React from "react";

const Footer = ({ completedTaskCount = 0, activeTaskCount = 0 }) => {
    return (
        <>
            {completedTaskCount + activeTaskCount > 0 && (
                <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                        {completedTaskCount > 0 && (
                            <>
                                Bạn đã hoàn thành {completedTaskCount} công
                                việc.
                                {activeTaskCount > 0 &&
                                    `còn ${activeTaskCount} công việc đang chờ bạn hoàn thành!`}
                            </>
                        )}
                        <>
                            {activeTaskCount > 0 &&
                                completedTaskCount === 0 && (
                                    <>
                                        {" "}
                                        Hãy bắt đầu {activeTaskCount} công việc
                                        của bạn ngay bây giờ!{" "}
                                    </>
                                )}
                        </>
                    </p>
                </div>
            )}
        </>
    );
};

export default Footer;
